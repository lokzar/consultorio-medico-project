
const router=require('express').Router();
const profileCheck = require('../middleware/profileCheck');
const Package=require('../models/Package.model');

router.get('/package/list',(req,res)=>{
    Package.find()
    .then(registeredPackages=>{

        res.render('packages/package-list', {data: registeredPackages} )
    })
    .catch(err=>(console.log("Error en find: ",err)))
})

router.get('/package/create',profileCheck,(req,res)=>{
    res.render('packages/package-create')
})

router.post('/package/create',(req,res)=>{
    Package.create(req.body)
    .then(newPackage=>{
        console.log(newPackage)
        res.redirect('/package/created')
    })
.catch(err=>(console.log("Error en create: ", err)))
    
})

router.get('/package/created',(req,res)=>{
    res.render('packages/package-created')
})




router.get('/package/:id',(req,res)=>{
    const{id}=req.params;
    Package.findById(id)
    .then(idPackage=>{
        res.render('packages/package-details',{package:idPackage})
    })
    .catch(err=>(console.log("Error en findbyId: ",err)))
})


//EDITAR

router.get("/package/:id/edit",profileCheck,(req,res,next)=>{
    const{id}=req.params
    Package.findById(id)
    .then(package=>{
        res.render("packages/package-edit",{package})
    })
    .catch(err=>console.log(err))
})

router.post("/package/:id/edit",(req,res,next)=>{
    const {id}=req.params
    Package.findByIdAndUpdate(id, req.body, {new: true})
    .then(()=>{
        res.redirect(`/package/${id}`)
    })
    .catch(err=>console.log(err))
})


module.exports=router;