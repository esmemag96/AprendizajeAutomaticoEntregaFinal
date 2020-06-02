// FILE: Student.js
/**
 * Model: Student
 */
const mongoose = require('mongoose');//requeriento para correr la base de datos con mongoose
const bcrypt = require('bcryptjs');//libreria para encryptar la contrasena
mongoose.Promise = global.Promise;

// Sale Schema para el documento creado en la base de datos.
const studentSchema = new mongoose.Schema({
    idStudent: {//id unico profesor 
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
      classes:[{//array de objectid con las clases que toma y el profesor que imparte
        _id: false,
        teachear: {
          type    : mongoose.Schema.Types.ObjectId, 
          ref     : 'Profesor',
          required: true
      },
          class: {
            type    : mongoose.Schema.Types.ObjectId,
            ref     : 'Class',
            required: true
        }
      }],
      password: {//constrasena con su hash 
        type: String,
        required: true
      }
    });
// Exportando el modelo para su uso 
const Student = module.exports = mongoose.model('Student', studentSchema);
module.exports.getUserById = function (id, callback) {
  Student.findById(id, callback);
}

//funcion para buscar a student por su matricula  y nos regresa un callbak con el reusltado de la promesa
module.exports.getUserByUsername = function (username, callback) {
const query = {
  idStudent: username
}

Student.findOne(query).populate('classes.class')
.populate('classes.teachear').exec((err, classes) => {
  callback(null, classes);
  });
}

//funcion para agregar una nuevo student a la base de datos y nos regresa un callbak con el reusltado de la promesa
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
