

const { Schema, model } = require("mongoose");

const appointSchema = new Schema(
  {
    day: String,
    month: String,
    year: String,
    idUser: [{ type: Schema.Types.ObjectId, ref: "User"}],
    idPackage: [{ type: Schema.Types.ObjectId, ref: "Package"}],
    idService: String
    //idService: [{ type: Schema.Types.ObjectId, ref: "Service"}],
  },
  {
    timestamps: true,
  }
);

const Appointment = model("Appointment", appointSchema);

module.exports = Appointment;
