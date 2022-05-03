
const router = require("express").Router()
const Appointment = require("../models/Appointment.model");
const Service = require("../models/Service.model");


router.get("/new/appointment", (req, res, next) => {
    Service.find()
        .then(services => {
            res.render("appointment/appointment-create", {services})
        })
        .catch(error => console.log(error))
    
})

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