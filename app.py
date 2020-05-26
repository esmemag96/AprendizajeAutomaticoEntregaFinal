import numpy as np
import translate
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
from helperScrpits import Train, sentiment
import pickle
import json

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

CORS(app, expose_headers='Authorization')

# Request to return the index.html
@app.route('/')
def home():
    return render_template('index.html')
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

    if(teacherIDChecker(teacherID) == False or classIDChecker(classID) == False or gradeChecker(grade1) == False or gradeChecker(grade2) == False):
        result = json.dumps({'predictionResult': None, "status": "Failure", "comment": "The format of the input is not correct"})
    else:
        try:
            int_features = [grade1 * .45, grade2 * .45]
            Train.Train(teacherID, classID)
            filename = 'Models/model'+ teacherID + classID + '.pkl'
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
    if(teacherIDChecker(teacherID) == False or classIDChecker(classID) == False):
        response =  { 'status' : 'Failure', '3DGraph': None, 'comment': "The class or teacher ID is not correct"}
    else:
        try:
            image = Train.getImage('Images/' + teacherID + classID + ".png")
            response =  { 'status' : 'Success', '3DGraph': image, "graphData": Train.GraficaMean(teacherID,classID)}
        except FileNotFoundError:
            response =  { 'status' : 'Failure', '3DGraph': None, 'comment': "The class or teacher ID is not correct"}
    return json.dumps(response)

def teacherIDChecker(teacherID):
    if(type(teacherID) == str and len(teacherID) == 10):
        return True
    else:
        return False

def classIDChecker(classID):
    if(type(classID) == str and len(classID) == 6):
        return True
    else:
        return False

def gradeChecker(grade):
    if(type(grade) == float):
        if(grade < 0 or grade > 100):
            return False
        else:
            return True
    else:
        return False

if __name__ == "__main__":
    debug = settings.DEBUG  # My settings object
    if (debug):
        from aoiklivereload import LiveReloader
        LiveReloader().start_watcher_thread()
        # Run the App
        app.run(debug=debug, workers=settings.WORKERS, access_log=debug)


