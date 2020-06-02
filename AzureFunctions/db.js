const mongoose = require('mongoose');//requeriento para correr la base de datos con mongoose
const DATABASE = process.env.MongodbAtlas;//clave del la base de datos .env

mongoose.Promise = global.Promise;
let isConnected;

//funcion con la cual nos conectamos a la base,nos regresa la coneccion hecha o un error 
module.exports = connectToDatabase = () => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
  }
  return mongoose.connect(DATABASE, { useNewUrlParser: true,useUnifiedTopology: true })//regresa una nueva coneccion si la anterior se cierra 
    .then(db => { 
      isConnected = db.connections[0].readyState;
    });
};
