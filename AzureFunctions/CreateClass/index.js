const mongoose = require('mongoose');//requeriento para correr la base de datos con mongoose
require('../db');//requeriento para conectarse a la base de datos
const Class = require('../models/ClassModel.js');//requerimiento para hacer uso de la schema de la class
module.exports = function (context, req) {
     //recuperamos los datos del request 
     let newClassr = new Class({
    classCode: req.body.classCode,
    className: req.body.className,
  });
    //nos conectamos a la base
  connectToDatabase()
  .then(() => {
   //llamamos a la funcion addUser para saber si el user existe
    Class.addClass(newClassr, (err, subject) => {
     if (err) {
        context.res = {//si el user no se guardo regresa un error regresamos un 400 
            status: 400,
            body: "No se guardo"
        };
     } else {
        context.res = {
            status: 200,//si el user  existe regresa todo info del user regresamos un 200
            body: subject
        };
        context.done();
     }
     });
  });
};