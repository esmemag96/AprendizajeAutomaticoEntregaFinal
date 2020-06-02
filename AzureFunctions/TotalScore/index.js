const mongoose = require('mongoose');//requeriento para correr la base de datos con mongoose
require('../db');//requeriento para conectarse a la base de datos
const Ecoa = require('../models/EcoaModel.js');//requeriento para hacer uso de la schema de la ecoa
module.exports = function (context, req) {
    //recuperamos los datos del request 
    let idProfessor = req.body.idProfessor;
    let idClass = req.body.idClass;
    let query = {
        idProfessor: idProfessor,
        idClass: idClass
      }
  //nos conectamos a la base 
  connectToDatabase()
  .then(() => {
    //llamamos a la funcion getTotalScore
    Ecoa.getTotalScore(query, (err, user) => {
      if (err || user == null) {//si nos regresa un error regresmo un 400 
        context.res = {
            status: 400,
            body: err
        };
        context.done();
     } else {
       //creamos varaibles para hacer el proemdio de las calificaciones
         var positiveTotal = 0
         var negativeTotal = 0
         var neutralTotal = 0
        //de cada json sacamos los score de los cometario positivos, neutral, negativos 
        user.forEach((document, index) => {
            positiveTotal= positiveTotal + document.totalScore.positive
            negativeTotal= negativeTotal + document.totalScore.negative
            neutralTotal= neutralTotal + document.totalScore.neutral
          });
          total = user.length * 100//sacamos el 100% de cada ecoa
          
        context.res = {//regresamos el grado de positividad negatividad y neutralidad
            status: 200,
            body: {positiveTotal:(positiveTotal*100)/total,
                negativeTotal:(negativeTotal*100)/total,
                neutralTotal:(neutralTotal*100)/total}
        };
        context.done();
     }
     });
  });
};