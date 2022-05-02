
const router = require("express").Router()
const Service = require("../models/Service.model");


router.get("/services" , (req,res,next) => {
    Service.find()
        .then(services => {
            res.render("service/service-list", {services})
        })
})

router.get("/new/service", (req, res, next) => {
    res.render("service/service-create")
})

router.post("/new/service", (req, res, next) => {
    Service.create(req.body)
        .then(service => {
            console.log(service)
            //res.render("service/service-details")
            res.send({service})
        })
        .catch(error => console.log(error))
})

module.exports = router