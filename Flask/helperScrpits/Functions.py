import numpy as np
import matplotlib.pyplot as plt
import io
import base64
from sklearn import linear_model
from mpl_toolkits.mplot3d import Axes3D
import pandas as pd
import pickle

from sklearn import linear_model
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.model_selection import cross_val_score
from sklearn.tree import DecisionTreeRegressor
from sklearn import metrics
from sklearn import tree
import statsmodels as sm
import statsmodels.formula.api as smf
from sklearn.preprocessing import MinMaxScaler


from statistics import stdev 
from statistics import mean 

def Train(idprofesor,idclass):

	# Importing the dataset:
	
	pb_df = pd.read_csv("helperScrpits/dataset.csv")
	pb_df.set_index('instr', inplace=True)#index intructor
	tGrades = pb_df.loc[idprofesor]#idteacher
	tGrades.set_index('class', inplace=True)#index class
	tGrades = tGrades.loc[idclass]##id class

	df2=pd.DataFrame(tGrades,columns=['Ecoa1','Ecoa2'])#new data frame fro the graph
	df2['Ecoa3']=pd.DataFrame(tGrades,columns=['Ecoa3'])

	x = df2['Ecoa1']#x variables
	y = df2['Ecoa1']#y variable
	
	model = smf.ols(formula='Ecoa3 ~ Ecoa1 + Ecoa2', data=df2)#linear regression model 
	results_formula = model.fit()#Fit multiple Linear Regression model to our Train set
	
	## Prepare the data for Visualization

	x_surf, y_surf = np.meshgrid(np.linspace(df2.Ecoa1.min(), df2.Ecoa1.max(), 100),np.linspace(df2.Ecoa2.min(), df2.Ecoa2.max(), 100))
	onlyX = pd.DataFrame({'Ecoa1': x_surf.ravel(), 'Ecoa2': y_surf.ravel()})
	fittedY=results_formula.predict(exog=onlyX)

	## convert the predicted result in an array
	fittedY=np.array(fittedY)
	#get the graph with the 3 axis
	fig = plt.figure()
	ax = fig.add_subplot(111, projection='3d')
	ax.plot_surface(x_surf,y_surf,fittedY.reshape(y_surf.shape), rstride=3, cstride=3,cmap='inferno', edgecolor='none', alpha=.6)
	ax.scatter(df2['Ecoa1'],df2['Ecoa2'],df2['Ecoa3'],color='black', s=30, edgecolor='black', alpha=.9)
	ax.set_xlabel('Ecoa1')
	ax.set_ylabel('Ecoa2')
	ax.set_zlabel('Ecoa3')
	#save image in filename 
	filenameImage = 'Images/'+ idprofesor +idclass+ '.png'
	fig.savefig(filenameImage, dpi = 300, transparent=True)
	#get the 3 variables 
	x1 = tGrades['Ecoa1'] 
	x2 = tGrades['Ecoa2'] 
	x3 = tGrades['Ecoa3']
	df = pd.DataFrame({"Ecoa1": x1, "Ecoa2": x2, "Ecoa3": x3})

	scaler = MinMaxScaler()
	scaled_df = scaler.fit_transform(df)
	scaled_df = pd.DataFrame(scaled_df, columns=['Ecoa1', 'Ecoa2', 'Ecoa3'])
	
	X = scaled_df[['Ecoa1','Ecoa2']]
	y = scaled_df['Ecoa3']

	X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
	#Fit the linear regression model to the training set, We use the fit method the arguments of the fit method will be training sets
	regressor = linear_model.LinearRegression()
	regressor.fit(X_train, y_train)
	#filename instructore
	filename = 'Models/model'+ idprofesor +idclass+ '.pkl'
	#Create a file model containing the training model
	pickle.dump(regressor, open(filename,'wb'))
	

def GraficaMean(idprofesor,idclass):
	
	pb_df = pd.read_csv("helperScrpits/dataset.csv")
	pb_df.set_index('instr', inplace=True)#index intructor
	tGrades = pb_df.loc[idprofesor]#idteacher
	tGrades.set_index('class', inplace=True)#index class
	tGrades = tGrades.loc[idclass]##id class

	x = tGrades['Ecoa1']
	y = tGrades['Ecoa2']

	dict= {
		"Ecoa1":np.array(x).tolist(),#arr1 = score1
		"mean1":np.mean(x),#mean1 = mean(score1)
		"Ecoa2":np.array(y).tolist(),#arr2 = score2
		"mean2":np.mean(y)}#mean2 = mean(score2)
	return dict
	
def getImage(path):
	with open(path, mode='rb') as file:
		img = file.read()
	return base64.encodebytes(img).decode("utf-8")
	
def teacherIDChecker(teacherID):
	if(type(teacherID) == str and len(teacherID) == 10):
		return True
	else:
		return False

def classIDChecker(classID):
	if(type(classID) == str and len(classID) == 6):
		return True
	else:
		return False

def gradeChecker(grade):
	if(type(grade) == float):
		if(grade < 0 or grade > 100):
			return False
		else:
			return True
	else:
		return False
