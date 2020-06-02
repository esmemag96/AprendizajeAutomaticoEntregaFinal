// FILE: ClassModel.js
/**
 * Model: class
 */
const mongoose = require('mongoose');//requeriento para correr la base de datos con mongoose
mongoose.Promise = global.Promise;

// class Schema para el documento creado en la base de datos.
const classSchema = new mongoose.Schema({
      classCode: {//id unico de la clase 
        type: String,
        required: true,
        trim: true,
      },
      className: {//nombre de la clase
        type: String,
        required: true,
        trim: true,
      }
    });
// Exportando el modelo para su uso 
const Class = module.exports = mongoose.model('Class', classSchema);

//funcion para agregar una nueva clase a la base de datos y nos regresa un callbak con el reusltado de la promesa
module.exports.addClass = function (newClass, callback) {
  newClass.save(callback);
}

//funcion para buscar a la clase por su _id y nos regresa un callbak con el reusltado de la promesa
module.exports.getUserById = function (id, callback) {
  Class.findById(id, callback);
}

//funcion para buscar a la clase por su codigo y nos regresa un callbak con el reusltado de la promesa
module.exports.getClassById = function (Code, callback) {
  const query = {
    classCode: Code
  }
  Class.findOne(query,(err, classes) => {
    if (err) throw err;
    callback(null, classes);
  });

}

