// FILE: ProfesorModel.js
/**
 * Model: Profesor
 */
const mongoose = require('mongoose');//requeriento para correr la base de datos con mongoose
const bcrypt = require('bcryptjs');//libreria para encryptar la contrasena
mongoose.Promise = global.Promise;

// Profesor Schema para el documento creado en la base de datos.
const profesorSchema = new mongoose.Schema({
    idProfessor: {//id unico profesor 
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      name: {//nombre del profesor 
        type: String,
        required: true,
        trim: true,
      },
      classes:[//array de objectid con las clases que imparte
        { 
            type : mongoose.Schema.Types.ObjectId, 
            ref: 'Class' }
      ],
      password: {//constrasena con su hash 
        type: String,
        required: true
      },
      Ecoa1: {//calificacion de la ecoa del primer parcial 
        type: Number,
        required: true
      },
      Ecoa2: {//calificacion de la ecoa del segundo parcial 
        type: Number,
        required: true
      }
    });
    
// Exportando el modelo para su uso 
const Profesor = module.exports = mongoose.model('Profesor', profesorSchema);

//funcion para buscar al profesor por su _id y nos regresa un callbak con el reusltado de la promesa
module.exports.getUserById = function (id, callback) {
    Profesor.findById(id, callback);
}

//funcion para buscar a profesor por su matricula  y nos regresa un callbak con el reusltado de la promesa
module.exports.getUserByUsername = function (username, callback) {
  const query = {
    idProfessor: username
  }
  Profesor.findOne(query).populate('classes').exec((err, classes) => {
    if (err) throw err;
    callback(null, classes);
  });

}
//funcion que nos regresa las califiacion de las ecoas1 y ecoas2 y nos regresa un callbak con el reusltado de la promesa
module.exports.getUsernameScores = function (username, callback) {
  const query = {
    idProfessor: username
  }
  Profesor.findOne(query,'Ecoa1 Ecoa2 -_id').exec((err, classes) => {
    if (err) throw err;
    callback(null, classes);
  });

}

//funcion para agregar una nuevo profesor a la base de datos y nos regresa un callbak con el reusltado de la promesa
module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {//encripatamos la password y agrgamos la salt
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}
//funcion para comparar el hash de la password 
module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}
