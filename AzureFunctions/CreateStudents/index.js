const mongoose = require('mongoose');//requeriento para correr la base de datos con mongoose
require('../db');//requeriento para conectarse a la base de datos
const Student = require('../models/StudentModel.js');//requerimiento para hacer uso de la schema de la student

module.exports = function (context, req) {
   //recuperamos los datos del request 
   let newUser = new Student({
    idStudent: req.body.idStudent,
    name: req.body.name,
    classes: req.body.classes,
    password: req.body.password,
  });
    //nos conectamos a la base
  connectToDatabase()
  .then(() => {
   //llamamos a la funcion addUser para saber si el user existe
    Student.addUser(newUser, (err, user) => {
     if (err) {
        context.res = {//si el user no se guardo regresa un error regresamos un 400 
            status: 400,
            body: "No se guardo"
        };
        context.done();
     } else {
        context.res = {//si el user  existe regresa todo info del user regresamos un 200
            status: 200,
            body: user
        };
        context.done();
     }
     });
  });
};