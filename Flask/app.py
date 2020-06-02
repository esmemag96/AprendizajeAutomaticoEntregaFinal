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

@app.route('/predict', methods=['GET'])#endpoint preict
def predict():#Funcion para determinar que se hace cuando el endpoint se llama.
    # Obtener parametros del request.
    teacherID = request.args.get('TeacherID')
    grade1 = request.args.get('grade1')
    grade2 = request.args.get('grade2')
    classID = request.args.get('ClassID')
    try:#Convertir valores de las calificaciones a flotantes
        grade1 = float(grade1)
        grade2 = float(grade2)
    except ValueError:#Si hay algun error, se regresa error, ya que los valores no son numeros.
        result = json.dumps({'predictionResult': None, "status": "Failure", "comment": "Grade 1 or 2 are not numbers"})
        return result
    #Si alguno de los datos no es correcto, se regresa error al cliente.
    if(Functions.teacherIDChecker(teacherID) == False or Functions.classIDChecker(classID) == False or Functions.gradeChecker(grade1) == False or Functions.gradeChecker(grade2) == False):
        result = json.dumps({'predictionResult': None, "status": "Failure", "comment": "The format of the input is not correct"})
    else:
        try:
            filename = 'Models/model'+ teacherID + classID + '.pkl'
            if(path.exists(filename) == False):#Si el archivo a entrenar no existe, se entrena.
                print("File does not exists, performing training")
                Functions.Train(teacherID, classID)
                print("Training Successfull")
            int_features = [grade1 * .45, grade2 * .45]
            modelTree = pickle.load(open(filename, 'rb'))
            #Se carga el archivo de entrenamiento.
            final_features = [np.array(int_features)]
            prediction = modelTree.predict(final_features)  # Se hace la prediccion.
            # Se redondea el resultado antes de ser enviado.
            output = round(prediction[0], 2) / .45
            # Se formatea el resultado para ser enviado.
            result = json.dumps({'predictionResult': output, "status": "Success"})
        except KeyError:#Error
            result = json.dumps({'predictionResult': None, "status": "Failure", "comment": "The class or teacher ID is not correct"})
    return result  # El resultado es enviado al cliente.
    
# Request para enviar graficas al cliente.
@app.route('/getGraphs', methods=['GET'])
def getGraphs():
    # Obtener parametros del request.
    teacherID = request.args.get('TeacherID')
    classID = request.args.get('ClassID')
    #Si alguno de los datos no es correcto, se regresa error al cliente.
    if(Functions.teacherIDChecker(teacherID) == False or Functions.classIDChecker(classID) == False):
        response =  { 'status' : 'Failure', '3DGraph': None, 'comment': "The class or teacher ID is not correct"}
    else:
        try:#Regresar imagen y datos para graficar.
            image = Functions.getImage('Images/' + teacherID + classID + ".png")
            response =  { 'status' : 'Success', '3DGraph': image, "graphData": Functions.GraficaMean(teacherID,classID)}
        except FileNotFoundError:#Si no existe la imagen, entonces se envia error, ya que los datos eran incorrectos.
            response =  { 'status' : 'Failure', '3DGraph': None, 'comment': "The class or teacher ID is not correct"}
    return json.dumps(response)

if __name__ == "__main__":
    debug = settings.DEBUG  # My settings object
    if (debug):
        from aoiklivereload import LiveReloader
        LiveReloader().start_watcher_thread()
        # Run the App
        app.run(debug=debug, workers=settings.WORKERS, access_log=debug)


