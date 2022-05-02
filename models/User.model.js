const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: [true, 'Este Usuario ya está en uso'],
    required:[true,'Se necesita un nombre de usuario']
  },
  password: {
    type:String,
    required:[true,'Ingresa una contraseña']
  },
  email:{
    type:String,
    unique: [true, 'Este mail ya está en uso'],
    required: [true, 'Email is required.'],
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
  },
  package:{
    type:Schema.Types.ObjectId,
    ref:'Package'
  },
  service:{
    type:Schema.Types.ObjectId,
    ref:'Service'
  },
  appointment:{
    type:Schema.Types.ObjectId,
    ref:'Appointment'
  },
  avatar:{
    type:String,

  },
  profile:{
    type: String,
    enum: ["admin","user"],
    default: "user",
  }
},{timestamps:true});

module.exports = model("User", userSchema);

