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
    grade1 = float(request.args.get('grade1'))
    grade2 = float(request.args.get('grade2'))
    classID = request.args.get('ClassID')

    if(teacherID == None or grade1 == None or grade2 == None or classID == None):
        result = json.dumps({'predictionResult': None, "status": "Something went wrong with the prediction."})
    else:
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
        result = json.dumps({'predictionResult': output, "status": "It Works!"})
    return result  # The result is returned to the client.
# Request to train the model using the dataset

@app.route('/getGraphs', methods=['GET'])
def getGraphs():
    teacherID = request.args.get('TeacherID')
    classID = request.args.get('ClassID')
    if(teacherID == None or classID == None):
        response =  { 'Status' : 'Failure'}
    else:
        image_path = 'Images/' + teacherID + classID + ".png"
        image = Train.getImage(image_path)
        x = Train.GraficaMean(teacherID)
        response =  { 'Status' : 'Success', 'ImageBytes': image, "graphData": x}
    return json.dumps(response)

if __name__ == "__main__":
    debug = settings.DEBUG  # My settings object
    if (debug):
        from aoiklivereload import LiveReloader
        LiveReloader().start_watcher_thread()
        # Run the App
        app.run(debug=debug, workers=settings.WORKERS, access_log=debug)
