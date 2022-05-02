const { Schema, model } = require("mongoose");

const packageSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required:[true,'Ingresa el nombre del paquete']
  },
  description: {
    type:String,
    required:true,
  },
  price:{
    type:String,
  }


},{timestamps:true});

module.exports = model("Package", packageSchema);