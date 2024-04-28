var mongoose = require('mongoose');

var esquema=new mongoose.Schema({
    nombre: String,
    boolean: Boolean,
    fecha: String,
    edad: Number,
});

module.exports = mongoose.model('modelos', esquema);