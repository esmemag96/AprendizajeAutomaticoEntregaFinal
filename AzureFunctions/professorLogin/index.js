const mongoose = require('mongoose');//requeriento para correr la base de datos con mongoose
require('../db');//requeriento para conectarse a la base de datos
const Profesor = require('../models/ProfesorModel.js');//requeriento para hacer uso de la schema de la Profesor
module.exports = function (context, req) {
    //recuperamos los datos del request 
    let idProfessor = req.body.idProfessor;
    let professorPassword = req.body.password;
    //nos conectamos a la base 
    connectToDatabase().then(() => {
     //llamamos a la funcion getUserByUsername para saber si el user existe
        Profesor.getUserByUsername(idProfessor, (err, user) => {
            if (err || user == null) {
                context.res = {//si el user no existe regresa un error regresamos un 400 
                    status: 404,
                    body: "El usuario no existe."
                };
                context.done();
            } else {
                 //llamamos a la funcion comparePassword para saber si la contrasena esta bien 
                Profesor.comparePassword(professorPassword, user.password, (err, isMatch) => {
                    if (isMatch) {
                        context.res = {//si el user no existe regresa un error regresamos un 400 
                            status: 200,
                            body: {
                                "object_id": user._id,
                                "idProfessor": user.idProfessor,
                                "ProfesorName": user.name,
                                "clases":user.classes,
                                "Ecoa1":user.Ecoa1,
                                "Ecoa2":user.Ecoa2,
                            }
                        };
                        context.done();
                    }
                    if (err == null) {
                        context.res = {//si la contrasena esta mal no existe regresa un error regresamos un 400
                            status: 400,
                            body: "Contraseña incorrecta."
                        };
                        context.done();
                    }
                });
            }
        });
    });
};
