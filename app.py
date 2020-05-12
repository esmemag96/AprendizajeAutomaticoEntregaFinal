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
        int_features = [data['TeacherID'], data['grade1'] * .45, data['grade2'] * .45]
        # final features is a numpy array, made of the list from above.
        final_features = [np.array(int_features)]
        prediction = modelTree.predict(final_features)  # The prediction is made.
        # The result from the prediction is rounded.
        output = round(prediction[0], 2) / .45
        # The result from the prediction is formated into JSON format.
        result = json.dumps({'prediction': output})
    return result  # The result is returned to the client.
# Request to train the model using the dataset

@app.route('/train', methods=['POST', 'GET'])
def trainModel():
    # If the request is not on JSON format, then return an error to the client.
    if(request.is_json == False):
        return json.dumps({'result': "bad post"})
    else:  # Else call the function 'Train()'
        # Return a json object with the result of the call (T or F)
        return json.dumps({'multilineal': Train.Train(), 'threeD': Train.Grafica3d(), 'tree': Train.TrainTree()})
@app.route('/getGraphs', methods=['POST'])
def getGraphs():
    # If the request is not on JSON format, then return an error to the client.
    if(request.is_json == False):
        return json.dumps({'result': "bad post"})
    else:  # Else call the function 'Train()'
        content = request.json
        image_path = 'static/img/grafica.png'
        image = Train.getImage(image_path)
        if(content['teacherID'] == -1):
            response =  { 'Status' : 'Success', 'ImageBytes': image}
        else:
            x = Train.GraficaMean(content['teacherID'])
            response =  { 'Status' : 'Success', 'ImageBytes': image, "meanGraph": x}
        return json.dumps(response)
        
@app.route('/text-analysis')
def textAnalysis():
    return render_template('textAnalysis.html')

@app.route('/translate-text', methods=['POST'])
def translate_text():
    data = request.get_json()
    text_input = data['text']
    translation_output = data['to']
    response = translate.get_translation(text_input, translation_output)
    return jsonify(response)

@app.route('/sentiment-analysis', methods=['POST'])
def sentiment_analysis():
    data = request.get_json()
    input_text = data['inputText']
    response = sentiment.get_sentiment(input_text)
    return jsonify(response)
if __name__ == "__main__":
    debug = settings.DEBUG  # My settings object
    if (debug):
        from aoiklivereload import LiveReloader
        LiveReloader().start_watcher_thread()
        # Run the App
        app.run(debug=debug, workers=settings.WORKERS, access_log=debug)
