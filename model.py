import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import pickle


pb_df = pd.read_csv("train.csv")
evaluacion1 = pb_df.iloc[:, 23:32].sum(axis=1)
pb_df.insert(1, "score3", evaluacion1, True) 
evaluacion2 = pb_df.iloc[:, 14:23].sum(axis=1)
pb_df.insert(1, "score2", evaluacion2, True) 
evaluacion3 = pb_df.iloc[:, 5:14].sum(axis=1)
pb_df.insert(1, "score1", evaluacion3, True)

teacher1=pb_df.loc[pb_df['instr'] == 1]
X = teacher1.iloc[:, :3]

y = teacher1.iloc[:, 3]

print(X)
print(y)

from sklearn.linear_model import LinearRegression
regressor = LinearRegression()

regressor.fit(X, y)

pickle.dump(regressor, open('model.pkl','wb'))

model = pickle.load(open('model.pkl','rb'))
print(model.predict([[1, 23, 14]]))
