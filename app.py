import numpy as np
from flask import Flask, request, jsonify, render_template
import Train
import pickle
import json

app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))
#Request to return the index.html
@app.route('/')
def home():
    return render_template('index.html')
#Request to return a new prediction.
@app.route('/predict',methods=['POST'])
def predict():
    if(request.is_json == False):#If the request is not on JSON format, then return an error to the client.
        return json.dumps({'result':"Error"})
    else:#Else, data is the json sent from the client.
        data = request.get_json()
        int_features = [data['TeacherID'], data['1stGrade'], data['2ndGrade']]#The features are retreived from the JSON object and inserted in a list.
        final_features = [np.array(int_features)]#final features is a numpy array, made of the list from above.
        prediction = model.predict(final_features)#The prediction is made.
        output = round(prediction[0], 2)#The result from the prediction is rounded.
        result = json.dumps({'prediction':output})#The result from the prediction is formated into JSON format.
    return result#The result is returned to the client.
#Request to train the model using the dataset
@app.route('/train',methods=['POST'])
def trainModel():
    if(request.is_json == False):#If the request is not on JSON format, then return an error to the client.
        return json.dumps({'result':"bad post"})
    else:#Else call the function 'Train()'
        return json.dumps({'trainingComplete':Train.Train()})#Return a json object with the result of the call (T or F)

if __name__ == "__main__":
    app.run(debug=True)