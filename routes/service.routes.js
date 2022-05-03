
const router = require("express").Router()
const Service = require("../models/Service.model");


router.get("/services" , (req,res,next) => {
    Service.find()
        .then(services => {
            res.render("service/service-list", {services})
        })
        .catch(error => console.log(error))
})

router.get("/new/service", (req, res, next) => {
    res.render("service/service-create")
})

router.post("/new/service", (req, res, next) => {
    Service.create(req.body)
        .then(() => {
            res.redirect("/services")
        })
        .catch(error => console.log(error))
})

module.exports = router