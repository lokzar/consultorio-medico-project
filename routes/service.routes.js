
const router = require("express").Router()
const Service = require("../models/Service.model");
const profileCheck = require('../middleware/profileCheck');

// Motrar todas las consultas

router.get("/services" , (req,res,next) => {
    Service.find()
        .then(services => {
            res.render("service/service-list", {services,isAdmin})
        })
        .catch(error => console.log(error))
})


// Crear consulta

router.get("/new/service", profileCheck, (req, res, next) => {
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

// Editar consulta

router.get("/services/:id/edit",profileCheck,(req,res,next)=>{
    const{id}=req.params
    Service.findById(id)
    .then(service=>{
        res.render("service/service-edit",{service})
    })
    .catch(err=>console.log(err))
})

router.post("/package/:id/edit",(req,res,next)=>{
    const {id}=req.params
    Package.findByIdAndUpdate(id, req.body, {new: true})
    .then(()=>{
        res.redirect("/services")
    })
    .catch(err=>console.log(err))
})

// Exportar ruta
module.exports = router