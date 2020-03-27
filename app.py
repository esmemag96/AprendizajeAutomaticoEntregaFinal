import numpy as np
from flask import Flask, request, jsonify, render_template
import Train
import pickle
import json

app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict',methods=['POST'])
def predict():
    if(request.is_json == False):
        result = json.dumps({'result':"Error"})
    else:
        data = request.get_json()
        int_features = [data['TeacherID'], data['1stGrade'], data['2ndGrade']]
        final_features = [np.array(int_features)]
        prediction = model.predict(final_features)
        print(prediction)
        output = round(prediction[0], 2)
        result = json.dumps({'prediction':output})
    return result

@app.route('/train',methods=['POST'])
def trainModel():
    if(request.is_json == False):
        result = json.dumps({'result':"bad post"})
    else:
        result = json.dumps({'trainingComplete':Train.Train()})
    return result
    

@app.route('/results',methods=['POST'])
def results():
    data = request.get_json(force=True)
    prediction = model.predict([np.array(list(data.values()))])
    output = prediction[0]
    return jsonify(output)
if __name__ == "__main__":
    app.run(debug=True)