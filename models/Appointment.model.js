

const { Schema, model } = require("mongoose");

const appointSchema = new Schema(
  {
    date: {
      type: Date,
      required: true
    },
    idUser: { type: Schema.Types.ObjectId, ref: "User"},
    idPackage: { type: Schema.Types.ObjectId, ref: "Package"},
    idService: { type: Schema.Types.ObjectId, ref: "Service"}
  },
  {
    timestamps: true,
  }
);

const Appointment = model("Appointment", appointSchema);

module.exports = Appointment;
