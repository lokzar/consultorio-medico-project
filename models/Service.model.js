
const { Schema, model } = require("mongoose");

const serviceSchema = new Schema(
  {
    serviceName: String,
    details: String,
    price: String
  },
  {
    timestamps: true,
  }
);

const Service = model("Service", serviceSchema);

module.exports = Service;
