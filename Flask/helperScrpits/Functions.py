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

def Train(idprofesor,idclass):#Funcion que se utiliza para entrenar los modelos.

	# Se importa y formatea el dataset
	pb_df = pd.read_csv("helperScrpits/dataset.csv")
	pb_df.set_index('instr', inplace=True)#index intructor
	tGrades = pb_df.loc[idprofesor]#idteacher
	tGrades.set_index('class', inplace=True)#index class
	tGrades = tGrades.loc[idclass]##id class

	df2=pd.DataFrame(tGrades,columns=['Ecoa1','Ecoa2'])#Nuevo dataframe
	df2['Ecoa3']=pd.DataFrame(tGrades,columns=['Ecoa3'])

	x = df2['Ecoa1']#Valores X
	y = df2['Ecoa1']#Valores Y
	
	model = smf.ols(formula='Ecoa3 ~ Ecoa1 + Ecoa2', data=df2)#Modelo de regresion lineal
	results_formula = model.fit()#Fit de multiples modelos de regresion a nuestros entrenamientos

	x_surf, y_surf = np.meshgrid(np.linspace(df2.Ecoa1.min(), df2.Ecoa1.max(), 100),np.linspace(df2.Ecoa2.min(), df2.Ecoa2.max(), 100))
	onlyX = pd.DataFrame({'Ecoa1': x_surf.ravel(), 'Ecoa2': y_surf.ravel()})
	fittedY=results_formula.predict(exog=onlyX)

	#Convierte el resultado en un arreglo
	fittedY=np.array(fittedY)
	#Grafica con 3 ejes.
	fig = plt.figure()
	ax = fig.add_subplot(111, projection='3d')
	ax.plot_surface(x_surf,y_surf,fittedY.reshape(y_surf.shape), rstride=3, cstride=3,cmap='inferno', edgecolor='none', alpha=.6)
	ax.scatter(df2['Ecoa1'],df2['Ecoa2'],df2['Ecoa3'],color='black', s=30, edgecolor='black', alpha=.9)
	ax.set_xlabel('Ecoa1')
	ax.set_ylabel('Ecoa2')
	ax.set_zlabel('Ecoa3')
	#Guarda la imagen
	filenameImage = 'Images/'+ idprofesor +idclass+ '.png'
	fig.savefig(filenameImage, dpi = 300, transparent=True)
	#Obtiene las tres variables
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
	filename = 'Models/model'+ idprofesor +idclass+ '.pkl'
	#Crea el modelo.
	pickle.dump(regressor, open(filename,'wb'))
	

def GraficaMean(idprofesor,idclass):#Funcion que se utiliza para obtener datos para graficar.
	pb_df = pd.read_csv("helperScrpits/dataset.csv")
	pb_df.set_index('instr', inplace=True)#index intructor
	tGrades = pb_df.loc[idprofesor]#idteacher
	tGrades.set_index('class', inplace=True)#index clase
	tGrades = tGrades.loc[idclass]#id clase

	x = tGrades['Ecoa1']
	y = tGrades['Ecoa2']

	dict = {
		"Ecoa1":np.array(x).tolist(),#Datos de primera evaluacion
		"mean1":np.mean(x),# Media de primera evaluacion
		"Ecoa2":np.array(y).tolist(),#Datos de segunda evaluacion
		"mean2":np.mean(y)
		}#Media de segunda evaluacion
	return dict
	
def getImage(path):#Funcion que ayuda a convertir una imagen a bytes, reciviendo la ruta de la imagen.
	with open(path, mode='rb') as file:
		img = file.read()
	return base64.encodebytes(img).decode("utf-8")
	
def teacherIDChecker(teacherID):#Funcion que ayuda a revisar que los datos del id del profesor tengan el formato correcto.
	if(type(teacherID) == str and len(teacherID) == 10):#Si el tipo de dato es string y su longitud es de 10 caracteres, entonces regresa verdadero, sino falso.
		return True
	else:
		return False

def classIDChecker(classID):#Funcion que ayuda a revisar que los datos del id de la clase tengan el formato correcto.
	if(type(classID) == str and len(classID) == 6):#Si el tipo de dato es string y su longitud es de 6 caracteres, entonces regresa verdadero, sino falso.
		return True
	else:
		return False

def gradeChecker(grade):#Funcion que ayuda a revisar que los datos de cada calificacion sean correctos.
	if(type(grade) == float):#Si el tipo es float y la calificacion esta entre 0 y 100, entonces regresa Verdadero, sino falso.
		if(grade < 0 or grade > 100):
			return False
		else:
			return True
	else:
		return False
