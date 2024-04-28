var mongoose = require('mongoose');
var DataBaseMongo ={};

/*class DataBaseMongo{
    db='origen'; //base de datos creada
    port='27017'; //Puerto de mongo
    host= '127.0.0.1'; //computadora donde esta el servidor
    constructor(){
        mongoose.connect(`mongodb://${this.host}:${this.port}/${this.db}`)
        .then(() =>console.log('Se conecto a mongodb'))
        .catch(error=>console.error('Hubo un error'));
    }

}*/

DataBaseMongo.conectar= async()=> {
    try {
        const url = 'mongodb://127.0.0.1:27017/origen';
      
      // Conectar a la base de datos
      await mongoose.connect(url);
      console.log('Conexión exitosa a la base de datos');
    } catch (error) {
      // Manejar errores de conexión
      console.error('Error al conectar a la base de datos:', error);
      throw error; // Rechazar la promesa con el error
    }
  }

module.exports = DataBaseMongo;