
const router = require("express").Router()
const Service = require("../models/Service.model");

// Motrar todas las consultas

router.get("/services" , (req,res,next) => {
    Service.find()
        .then(services => {
            res.render("service/service-list", {services})
        })
        .catch(error => console.log(error))
})


// Crear consulta

router.get("/new/service", (req, res, next) => {
    res.render("service/service-create")
})

// Recibir info de formulario para crear consulta

router.post("/new/service", (req, res, next) => {
    Service.create(req.body)
        .then(() => {
            res.redirect("/services")
        })
        .catch(error => console.log(error))
})

// Detalles de cada consulta

router.get('/services/:id',(req,res)=>{
    const{id}=req.params;
    Service.findById(id)
    .then(idService=>{
        res.render('service/service-details',{service:idService})
    })
    .catch(error => console.log(error))
})

// Exportar ruta
module.exports = router