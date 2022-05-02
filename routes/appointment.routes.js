
const router = require("express").Router()
const Appointment = require("../models/Appointment.model");


router.get("/new/appointment", (req, res, next) => {
    res.render("appointment/appointment")
})

router.post("/new/appointment", (req, res, next) => {
    Appointment.create(req.body)
        .then(appointment => {
            console.log(appointment)
            res.render("appointment/appointment-details")
        })
        .catch(error => console.log(error))
})

module.exports = router