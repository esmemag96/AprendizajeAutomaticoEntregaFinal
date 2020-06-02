// FILE: EcoaModel.js
/**
 * Model: Ecoa
 */

const mongoose = require('mongoose');//requeriento para correr la base de datos con mongoose
mongoose.Promise = global.Promise;

// ecoa Schema para el documento creado en la base de datos.
const ecoaSchema = new mongoose.Schema({
    questions: [],
    idStudent: {
        type : mongoose.Schema.Types.ObjectId,  
        ref: "Student"
      },
    idProfessor: {
        type : mongoose.Schema.Types.ObjectId,  
        ref: "Profesor"
      },
      idClass: {
        type : mongoose.Schema.Types.ObjectId,  
        ref: "Class"
      },
      totalScore: {
      }
    });
    
// Exportando el modelo para su uso 
const Ecoa = module.exports = mongoose.model('Ecoa', ecoaSchema);

//funcion para agregar una nueva ecoa a la base de datos y nos regresa un callbak con el reusltado de la promesa
module.exports.addEcoa = function (newClass, callback) {
  return newClass.save(callback);
}

//funcion para buscar a la ecoa por el id del profesor y de la clase, nos regresa un callbak con el reusltado de la promesa
module.exports.getUserByUsername = function (query, callback) {
  console.log(query)
  Ecoa.find(query).select('questions').populate('idClass').exec((err, classes) => {
    callback(null, classes);
    });
  }
  
//funcion para sacar el score total de las ecoas y nos regresa un callbak con el reusltado de la promesa
module.exports.getTotalScore = function (query, callback) {
    console.log(query)
    Ecoa.find(query).select('totalScore').exec((err, classes) => {
      callback(null, classes);
      });
    }
  

