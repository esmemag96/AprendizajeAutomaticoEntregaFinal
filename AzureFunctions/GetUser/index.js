const mongoose = require('mongoose');//requeriento para correr la base de datos con mongoose
require('../db');//requeriento para conectarse a la base de datos
const Student = require('../models/StudentModel.js');//requerimiento para hacer uso de la schema de la student

module.exports = function (context, req) {
  //recuperamos los datos del request 
  let idStudent = req.body.idStudent;
  //nos conectamos a la base
  connectToDatabase()
    .then(() => {
      //llamamos a la funcion getUserByUsername para saber si el user existe
      Student.getUserByUsername(idStudent, (err, user) => {
        if (err || user == null) {
          context.res = {//si el user no existe regresa un error regresamos un 400 
            status: 400,
            body: "No se encontro"
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