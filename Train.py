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
from sklearn.preprocessing import MinMaxScaler


from statistics import stdev 
from statistics import mean 

def Train():
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
	from sklearn.linear_model import LinearRegression
	
	#Create an object called regressor in the LinearRegression class()
	regressor = LinearRegression()
	
	#Fit the linear regression model to the training set, We use the fit method the arguments of the fit method will be training sets
	regressor.fit(X_train,y_train)
	
	#Create a file model containing the training model
	pickle.dump(regressor, open('Models/model.pkl','wb'))
	
	#Read the file model containing the training model
	model = pickle.load(open('Models/model.pkl','rb'))
	
	#Predicting the Test set results:
	# scores_0 = cross_val_score(model, X_train, y_train, cv=5)
	# print("Accuracy: %0.2f (+/-%0.2f)" % (scores_0.mean(),scores_0.std()*2))

	return True
	
def Grafica3d():
	pb_df = pd.read_csv("train.csv")
	evaluacion1 = pb_df.iloc[:, 23:32].sum(axis=1)
	pb_df.insert(1, "score3", evaluacion1, True) 
	evaluacion2 = pb_df.iloc[:, 14:23].sum(axis=1)
	pb_df.insert(1, "score2", evaluacion2, True) 
	evaluacion3 = pb_df.iloc[:, 5:14].sum(axis=1)
	pb_df.insert(1, "score1", evaluacion3, True)

	X = pb_df[['score1','score2']]
	Y = pb_df['score3']

	# split en 3 varibles 
	x = X['score1']# score1
	y = X['score2']# score2
	z = Y # score3

	x_pred = np.linspace(x.min(), x.max(), 45)  # rangos del score1
	y_pred = np.linspace(y.min(), y.max(), 45)  # rangos del score2

	xx_pred, yy_pred = np.meshgrid(x_pred, y_pred)  # haces el mesh de los datos para la grafica 
	model_viz = np.array([xx_pred.flatten(), yy_pred.flatten()]).T #unes todos los elementos a predecir en un arreglo
	################################################ Train #############################################

	ols = linear_model.LinearRegression()
	model = ols.fit(X, Y)
	predicted = model.predict(model_viz)# prediction para evaluar en el futuro 
	############################################## Evaluate ############################################

	r2 = model.score(X, Y)#r^2 para saber que tan accurate es la prediction 

	############################################## Plot ################################################
	plt.style.use('default')

	fig = plt.figure(figsize=(12, 4))

	# creas los axes de la grafica 
	ax1 = fig.add_subplot(131, projection='3d')
	ax2 = fig.add_subplot(132, projection='3d')
	ax3 = fig.add_subplot(133, projection='3d')

	axes = [ax1, ax2, ax3]

	for ax in axes:#metes todos los datos 
		ax.plot(x, y, z, color='k', zorder=5, linestyle='none', marker='o', alpha=0.3)
		ax.scatter(xx_pred.flatten(), yy_pred.flatten(), predicted, facecolor=(1,1,1,1), s=20, edgecolor='#70b3f0')

		ax.set_xlabel('score1', fontsize=12)
		ax.set_ylabel('score2', fontsize=12)
		ax.set_zlabel('score3', fontsize=12)
		ax.locator_params(nbins=4, axis='x')
		ax.locator_params(nbins=5, axis='x')


	ax1.view_init(elev=27, azim=112)
	ax2.view_init(elev=16, azim=-51)
	ax3.view_init(elev=44, azim=350)
	fig.suptitle('$R^2 = %.2f$' % r2, fontsize=20) # R^2 del modelo 

	fig.tight_layout()
	fig.savefig('static/img/grafica.png', transparent=True)
	return True
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
		"arr1":np.array(x),#arr1 = score1
		"mean1":np.mean(x),#mean1 = mean(score1)
		"arr2":np.array(y),#arr2 = score2
		"mean2":np.mean(y)}#mean2 = mean(score2)
	return dict


def getImage(path):
	with open(path, mode='rb') as file:
		img = file.read()
	return base64.encodebytes(img).decode("utf-8")
