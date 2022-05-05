
const router = require("express").Router()
const Service = require("../models/Service.model");
const profileCheck = require('../middleware/profileCheck');

// Motrar todas las consultas

router.get("/services" , (req,res,next) => {
    Service.find()
        .then(services => {
            const isAdmin = req.session?.user?.profile=="admin" ? true : false
            const isLoggedIn = req.session?.user ? true :false
            const username = req.session?.user?.username
            const avatar=req.session?.user?.avatar
            res.render("service/service-list", {services,isAdmin,isLoggedIn,username,avatar})
        })
        .catch(error => console.log(error))
})


// Crear consulta

router.get("/new/service", profileCheck, (req, res, next) => {
    const isAdmin = req.session?.user?.profile=="admin" ? true : false
    const isLoggedIn = req.session?.user ? true :false
    const username = req.session?.user?.username
    const avatar=req.session?.user?.avatar
    res.render("service/service-create", {isAdmin,isLoggedIn,username,avatar})
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
        const isAdmin = req.session?.user?.profile=="admin" ? true : false
        const isLoggedIn = req.session?.user ? true :false
        const username = req.session?.user?.username
        const avatar=req.session?.user?.avatar
        res.render('service/service-details',{service:idService,isAdmin,isLoggedIn,username,avatar})
    })
    .catch(error => console.log(error))
})

// Editar consulta

router.get("/services/:id/edit",profileCheck,(req,res,next)=>{
    const{id}=req.params
    Service.findById(id)
    .then(service=>{
        const isAdmin = req.session?.user?.profile=="admin" ? true : false
        const isLoggedIn = req.session?.user ? true :false
        const username = req.session?.user?.username
        const avatar=req.session?.user?.avatar
        res.render("service/service-edit",{service,isAdmin,isLoggedIn,username,avatar})
    })
    .catch(err=>console.log(err))
})

router.post("/services/:id/edit",(req,res,next)=>{
    const {id}=req.params
    Package.findByIdAndUpdate(id, req.body, {new: true})
    .then(()=>{
        res.redirect("/services")
    })
    .catch(err=>console.log(err))
})

// Exportar ruta
module.exports = router