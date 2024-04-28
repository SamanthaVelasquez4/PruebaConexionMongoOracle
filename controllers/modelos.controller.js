var modelos= require('../models/modelos.model');
var modelosController = {};
const oracledb = require('oracledb');
const dbConfig = require('../utils/databaseOracle');

modelosController.copiaModelosDestino = async () => {
    try {
        // Utilizar el método find() para obtener todos los documentos del modelo
        const modelosArray = await modelos.find();
        console.log(modelosArray);

        // Iterar sobre cada modelo y realizar la inserción
        for (const modelo of modelosArray) {
            try {
                // Hacer la conexión
                const connection = await oracledb.getConnection(dbConfig);

                if(modelo.boolean){
                    boolean = '1';
                }else{
                    boolean = '0';
                }
        
                // Secuencia SQL 
                const secuenciaSQL = `INSERT INTO tbl_destino (id, fecha, nombre, edad, boolean)
                VALUES (:id, TO_DATE(:fecha, 'DD/MM/YYYY'), :nombre, :edad, :boolean)`;
        
                // Objeto consumidor
                const binds = {
                    id: modelo._id.toString(),
                    fecha: modelo.fecha,
                    nombre: modelo.nombre,
                    edad: modelo.edad,
                    boolean: boolean
                };
                
        
                // Opciones para realizar el commit
                const options = {
                    autoCommit: true,
                    outFormat: oracledb.OUT_FORMAT_OBJECT
                };
        
                // Ejecutar la consulta
                const result = await connection.execute(secuenciaSQL, binds, options);
        
                if (result.rowsAffected && result.rowsAffected === 1) {
                    await connection.close();
                    console.log({ exito: true, mensaje: "Insertado correctamente" });
                } else {
                    console.log({ exito: false, mensaje: "No se pudo insertar" });
                }
            } catch (error) {
                console.log({ error: error.message }); 
            }
        }
    } catch (error) {
        // Manejar cualquier error que ocurra durante la consulta a la base de datos
        console.error('Error al obtener todos los modelos:', error);
        throw error; // Lanzar el error para que quien llame a esta función pueda manejarlo
    }
};

module.exports = modelosController;