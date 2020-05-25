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
	
	pb_df = pd.read_csv("helperScrpits/newTrain.csv")
	
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
	
def TrainTree():
	# Importing the dataset:
	pb_df = pd.read_csv("train.csv")
	
	#this data set contains 28 questions which we divide into 3 sections, each section is referred to as a school year 
	evaluacion1 = pb_df.iloc[:, 23:32].sum(axis=1)#get the sum of the elements in the column 23 to 32
	pb_df.insert(1, "score3", evaluacion1, True) #add the column in the dataset 
	evaluacion2 = pb_df.iloc[:, 14:23].sum(axis=1)#get the sum of the elements in the column 14 to 23
	pb_df.insert(1, "score2", evaluacion2, True) #add the column in the dataset 
	evaluacion3 = pb_df.iloc[:, 5:14].sum(axis=1)#get the sum of the elements in the column 5 to 14
	pb_df.insert(1, "score1", evaluacion3, True)#add the column in the dataset 

	X = pb_df.iloc[:, :3]#the x-axis in the multilinear regression will be the column [instr, score 1, score 2]
	y = pb_df.iloc[:, 3]#the y-axis in the multilinear regression will be the column [score3] this will be the prediction 
	
	#Splitting the dataset into the Training and Test dataset
	X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)#Split the dataset in 20% test and 80% train
	
	#Fit multiple Linear Regression model to our Train set
	from sklearn.tree import DecisionTreeRegressor

	
	#Create an object called regressor in the LinearRegression class()
	regressor = DecisionTreeRegressor()
	
	#Fit the linear regression model to the training set, We use the fit method the arguments of the fit method will be training sets
	regressor.fit(X_train,y_train)
	
	#Create a file model containing the training model
	pickle.dump(regressor, open('Models/modelTree.pkl','wb'))
	
	#Read the file model containing the training model
	model = pickle.load(open('Models/modelTree.pkl','rb'))


	#Predicting the Test set results:
	# scores_0 = cross_val_score(model, X_train, y_train, cv=5)
	# print("Accuracy: %0.2f (+/-%0.2f)" % (scores_0.mean(),scores_0.std()*2))
	return True
	
def GraficaMean(id_instr):
# Importing the dataset:
	pb_df = pd.read_csv("train.csv")
	#this data set contains 28 questions which we divide into 3 sections, each section is referred to as a school year 
	evaluacion1 = pb_df.iloc[:, 23:32].sum(axis=1)#get the sum of the elements in the column 23 to 32
	pb_df.insert(1, "score3", evaluacion1, True) #add the column in the dataset 
	evaluacion2 = pb_df.iloc[:, 14:23].sum(axis=1)#get the sum of the elements in the column 14 to 23
	pb_df.insert(1, "score2", evaluacion2, True) #add the column in the dataset 
	evaluacion3 = pb_df.iloc[:, 5:14].sum(axis=1)#get the sum of the elements in the column 5 to 14
	pb_df.insert(1, "score1", evaluacion3, True)#add the column in the dataset 

	x1 = pb_df['score1'] 
	x2 = pb_df['score2'] 
	x3 = pb_df['score3']
	instr = pb_df['instr']
	df = pd.DataFrame({"instr": instr,"score1": x1, "score2": x2, "score3": x3})
	df.set_index('instr', inplace=True)
	tGrades = df.loc[id_instr]
	x = tGrades['score1']
	y = tGrades['score2']

	dict= {
		"arr1":np.array(x).tolist(),#arr1 = score1
		"mean1":np.mean(x),#mean1 = mean(score1)
		"arr2":np.array(y).tolist(),#arr2 = score2
		"mean2":np.mean(y)}#mean2 = mean(score2)
	return dict


def getImage(path):
	with open(path, mode='rb') as file:
		img = file.read()
	return base64.encodebytes(img).decode("utf-8")
