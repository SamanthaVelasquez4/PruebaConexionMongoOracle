const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
var bodyParser = require('body-parser');
var DataBaseMongo = require('./utils/databaseMongo');
var modelosController = require('./controllers/modelos.controller');

app.use(express.static('public')); //Se utiliza para ejecutar Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send("Servidor levantado correctamente");
})

DataBaseMongo.conectar()
.then(() => {
    console.log('Conexión exitosa a la base de datos');
    // Llamar a la función después de la conexión exitosa a la base de datos
    modelosController.copiaModelosDestino();
}).catch(error => {
    console.error('Error al conectar a la base de datos:', error);});

app.listen(port, () => {
    console.log(`Servidor levantado en el puerto: ${port}`);
})


 