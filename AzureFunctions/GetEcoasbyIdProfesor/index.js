const mongoose = require('mongoose');//requerimiento para correr la base de datos con mongoose
require('../db');//requerimiento para conectarse a la base de datos
const Ecoa = require('../models/EcoaModel.js');//requerimiento para hacer uso de la schema de la student
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
    //llamamos a la funcion getUserByUsername para saber si el user existe
    Ecoa.getUserByUsername(query, (err, user) => {
      if (err || user == null) {//si el user no existe regresa un error regresamos un 400 
        context.res = {
            status: 400,
            body: err
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