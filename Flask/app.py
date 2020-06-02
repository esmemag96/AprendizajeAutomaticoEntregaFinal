import numpy as np
import translate
import os.path
import pickle
import json
from os import path
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
from helperScrpits import Functions

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

CORS(app, expose_headers='Authorization')

# Request to return a new prediction.
@app.route('/predict', methods=['GET'])
def predict():
    # If the request is not on JSON format, then return an error to the client.
    teacherID = request.args.get('TeacherID')
    grade1 = request.args.get('grade1')
    grade2 = request.args.get('grade2')
    classID = request.args.get('ClassID')
    try:
        grade1 = float(grade1)
        grade2 = float(grade2)
    except ValueError:
        # Handle the exception
        result = json.dumps({'predictionResult': None, "status": "Failure", "comment": "Grade 1 or 2 are not numbers"})
        return result

    if(Functions.teacherIDChecker(teacherID) == False or Functions.classIDChecker(classID) == False or Functions.gradeChecker(grade1) == False or Functions.gradeChecker(grade2) == False):
        result = json.dumps({'predictionResult': None, "status": "Failure", "comment": "The format of the input is not correct"})
    else:
        try:
            filename = 'Models/model'+ teacherID + classID + '.pkl'
            if(path.exists(filename) == False):
                print("File does not exists, performing training")
                Functions.Train(teacherID, classID)
                print("Training Successfull")
            int_features = [grade1 * .45, grade2 * .45]
            modelTree = pickle.load(open(filename, 'rb'))
            #final features is a numpy array, made of the list from above.
            final_features = [np.array(int_features)]
            prediction = modelTree.predict(final_features)  # The prediction is made.
            # The result from the prediction is rounded.
            output = round(prediction[0], 2) / .45
            # The result from the prediction is formated into JSON format.
            result = json.dumps({'predictionResult': output, "status": "Success"})
        except KeyError:
            result = json.dumps({'predictionResult': None, "status": "Failure", "comment": "The class or teacher ID is not correct"})
    return result  # The result is returned to the client.
# Request to train the model using the dataset

@app.route('/getGraphs', methods=['GET'])
def getGraphs():
    teacherID = request.args.get('TeacherID')
    classID = request.args.get('ClassID')
    if(Functions.teacherIDChecker(teacherID) == False or Functions.classIDChecker(classID) == False):
        response =  { 'status' : 'Failure', '3DGraph': None, 'comment': "The class or teacher ID is not correct"}
    else:
        try:
            image = Functions.getImage('Images/' + teacherID + classID + ".png")
            response =  { 'status' : 'Success', '3DGraph': image, "graphData": Functions.GraficaMean(teacherID,classID)}
        except FileNotFoundError:
            response =  { 'status' : 'Failure', '3DGraph': None, 'comment': "The class or teacher ID is not correct"}
    return json.dumps(response)

if __name__ == "__main__":
    debug = settings.DEBUG  # My settings object
    if (debug):
        from aoiklivereload import LiveReloader
        LiveReloader().start_watcher_thread()
        # Run the App
        app.run(debug=debug, workers=settings.WORKERS, access_log=debug)


