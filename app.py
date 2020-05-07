import numpy as np
from flask import Flask, request, jsonify, render_template
import Train
import pickle
import json

app = Flask(__name__)
model = pickle.load(open('Models/model.pkl', 'rb'))
modelTree = pickle.load(open('Models/modelTree.pkl', 'rb'))
# Request to return the index.html
@app.route('/')
def home():
    return render_template('index.html')
# Request to return a new prediction.
@app.route('/predict', methods=['POST'])

def predict():
    # If the request is not on JSON format, then return an error to the client.
    if(request.is_json == False):
        return json.dumps({'result': "Error"})
    else:  # Else, data is the json sent from the client.
        data = request.get_json()
        # The features are retreived from the JSON object and inserted in a list.
        int_features = [data['TeacherID'], data['1stGrade'], data['2ndGrade']]
        # final features is a numpy array, made of the list from above.
        final_features = [np.array(int_features)]
        prediction = model.predict(final_features)  # The prediction is made.
        # The result from the prediction is rounded.
        output = round(prediction[0], 2)
        # The result from the prediction is formated into JSON format.
        result = json.dumps({'prediction': output})
    return result  # The result is returned to the client.
# Request to train the model using the dataset

@app.route('/train', methods=['POST'])
def trainModel():
    # If the request is not on JSON format, then return an error to the client.
    if(request.is_json == False):
        return json.dumps({'result': "bad post"})
    else:  # Else call the function 'Train()'
        # Return a json object with the result of the call (T or F)
        # Train.Grafica3d()
        # Train.TrainTree()
        return json.dumps({'trainingComplete': Train.Train()})


if __name__ == "__main__":
    debug = settings.DEBUG  # My settings object
    if (debug):
        from aoiklivereload import LiveReloader
        LiveReloader().start_watcher_thread()
        # Run the App
        #
        app.run(debug=debug, workers=settings.WORKERS, access_log=debug)
