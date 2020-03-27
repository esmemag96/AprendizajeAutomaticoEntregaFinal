import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import pickle
from sklearn.model_selection import train_test_split

def Train():
	pb_df = pd.read_csv("train.csv")

	evaluacion1 = pb_df.iloc[:, 23:32].sum(axis=1)
	pb_df.insert(1, "score3", evaluacion1, True) 
	evaluacion2 = pb_df.iloc[:, 14:23].sum(axis=1)
	pb_df.insert(1, "score2", evaluacion2, True) 
	evaluacion3 = pb_df.iloc[:, 5:14].sum(axis=1)
	pb_df.insert(1, "score1", evaluacion3, True)

	X = pb_df.iloc[:, :3]
	y = pb_df.iloc[:, 3]
	
	X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
	
	from sklearn.linear_model import LinearRegression
	regressor = LinearRegression()
	
	regressor.fit(X_train,y_train)
	
	pickle.dump(regressor, open('model.pkl','wb'))
	
	model = pickle.load(open('model.pkl','rb'))
	
	print(model.predict([[1, 23, 14]]))

	return True
