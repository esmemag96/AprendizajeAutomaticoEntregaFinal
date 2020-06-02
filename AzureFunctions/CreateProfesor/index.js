const mongoose = require('mongoose');//requeriento para correr la base de datos con mongoose
require('../db');//requeriento para conectarse a la base de datos
const Profesor = require('../models/ProfesorModel.js');//requerimiento para hacer uso de la schema de la profesor
module.exports = function (context, req) {

     //recuperamos los datos del request 
    let stringObjectIdArray = req.body.class;
    let objectIdArray = stringObjectIdArray.map(s => mongoose.Types.ObjectId(s));

   // Create a new user with the information that they subscribed
   let newUser = new Profesor({
    idProfessor: req.body.idProfessor,
    name: req.body.name,
    classes: objectIdArray,
    password: req.body.password,
  });
  //nos conectamos a la base
  connectToDatabase()
  .then(() => {
    //llamamos a la funcion addUser para saber si el user existe
    Profesor.addUser(newUser, (err, user) => {
     if (err) {
        context.res = {//si el user no se guardo regresa un error regresamos un 400 
            status: 400,
            body: "No se guardo"
        };
     } else {
        context.res = {
            status: 200,//si el user  existe regresa todo info del user regresamos un 200
            body: user
        };
        context.done();
     }
     });
  });
};