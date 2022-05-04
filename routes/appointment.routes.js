
const router = require("express").Router()
const abletoappointment = require("../middleware/abletoappointment");
const Appointment = require("../models/Appointment.model");
const Service = require("../models/Service.model");


// Enviar formulario

router.get("/new/appointment", abletoappointment, (req, res, next) => {
    Service.find()
        .then(services => {
            res.render("appointment/appointment-create", {services})
        })
        .catch(error => console.log(error))
    
})

// Recibir datos

router.post("/new/appointment", (req, res, next) => {
    Appointment.create(req.body)
        .then(appointment => {
            console.log(appointment)
            res.render("appointment/appointment-details")
            //res.send({appointment})
        })
        .catch(error => console.log(error))
})

module.exports = router