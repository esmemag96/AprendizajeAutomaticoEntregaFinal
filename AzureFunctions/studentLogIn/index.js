const mongoose = require('mongoose');//requeriento para correr la base de datos con mongoose
require('../db');//requeriento para conectarse a la base de datos
const Student = require('../models/StudentModel.js');//requeriento para hacer uso de la schema de la students
module.exports = function (context, req) {
    //recuperamos los datos del request 
    let idStudent = req.body.idStudent;
    let studentPassword = req.body.password;
    //nos conectamos a la base 
    connectToDatabase().then(() => {
        //llamamos a la funcion getUserByUsername para saber si el user existe
        Student.getUserByUsername(idStudent, (err, user) => {
            if (err || user == null) {
                context.res = {//si el user no existe regresa un error regresamos un 400 
                    status: 404,
                    body: "El usuario no existe."
                };
                context.done();
            } else {
                 //llamamos a la funcion comparePassword para saber si la contrasena esta bien 
                Student.comparePassword(studentPassword, user.password, (err, isMatch) => {
                    if (isMatch) {
                        context.res = {//esta bien regresamos un 200 
                            status: 200,
                            body: {
                                "object_id": user._id,
                                "idStudent": user.idStudent,
                                "studentName": user.name
                            }
                        };
                        context.done();
                    }
                    if (err == null) {//si la contrasena esta mal no existe regresa un error regresamos un 400 
                        context.res = {
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
