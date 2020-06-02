const mongoose = require('mongoose');//requeriento para correr la base de datos con mongoose
require('../db');//requeriento para conectarse a la base de datos
const Class = require('../models/ClassModel.js');//requerimiento para hacer uso de la schema de la class
module.exports = function (context, req) {
   //recuperamos los datos del request 
  let idClass = req.body.idClass;
  //nos conectamos a la base
  connectToDatabase()
  .then(() => {
   //llamamos a la funcion getClassById para saber si el user existe
    Class.getClassById(idClass, (err, user) => {
     if (err) {
        context.res = {//si el user no existe regresa un error regresamos un 400 
            status: 400,
            body: "No se encontro"
        };
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