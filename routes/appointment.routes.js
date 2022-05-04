
const router = require("express").Router()
const abletoappointment = require("../middleware/abletoappointment");
const Appointment = require("../models/Appointment.model");
const Service = require("../models/Service.model");


// Enviar formulario

router.get("/new/appointment", abletoappointment, (req, res, next) => {
    const isAdmin = req.session?.user?.profile=="admin" ? true : false
    const isLoggedIn = req.session?.user ? true :false
    const username = req.session?.user?.username
    const avatar=req.session?.user?.avatar
    Service.find()
        .then(services => {
            res.render("appointment/appointment-create", {services,isAdmin,isLoggedIn,username,avatar})
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
            Service.findById(appointment.idService)
                .then(serviceFound => {
                    console.log(appointment)
                    res.render("appointment/appointment-details", {appointment, serviceFound})
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
})

module.exports = router