
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
    console.log(req.session?.user?._id)

    const appointment = {...req.body, idUser: req.session?.user?._id}

    console.log(appointment)
    Appointment.create(appointment)
        .then(appointment => {
            console.log(appointment)
            res.render("appointment/appointment-details", appointment)
            //res.send({appointment})
        })
        .catch(error => console.log(error))
})

module.exports = router