import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import pickle
from sklearn.model_selection import train_test_split

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
	pickle.dump(regressor, open('model.pkl','wb'))
	
	#Read the file model containing the training model
	model = pickle.load(open('model.pkl','rb'))
	
	#Predicting the Test set results:
	#print(model.predict(X_test))

	return True
