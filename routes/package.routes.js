
const router=require('express').Router();
const profileCheck = require('../middleware/profileCheck');
const Package=require('../models/Package.model');

router.get('/package/list',(req,res)=>{
    
    Package.find()
    .then(registeredPackages=>{
        const isAdmin = req.session?.user?.profile=="admin" ? true : false
        const isLoggedIn = req.session?.user ? true :false
        const username = req.session?.user?.username
        const avatar=req.session?.user?.avatar
        res.render('packages/package-list', {data: registeredPackages,isAdmin,isLoggedIn,username,avatar} )
    })
    .catch(err=>(console.log("Error en find: ",err)))
})

router.get('/package/create',profileCheck,(req,res)=>{
    const isAdmin = req.session?.user?.profile=="admin" ? true : false
    const isLoggedIn = req.session?.user ? true :false
    const username = req.session?.user?.username
    const avatar=req.session?.user?.avatar
    res.render('packages/package-create',{isAdmin,isLoggedIn,username,avatar})
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
    const isAdmin = req.session?.user?.profile=="admin" ? true : false
    const isLoggedIn = req.session?.user ? true :false
    const username = req.session?.user?.username
    const avatar=req.session?.user?.avatar
    res.render('packages/package-created', {isAdmin,isLoggedIn,username,avatar})
})




router.get('/package/:id',(req,res)=>{
    const{id}=req.params;
    Package.findById(id)
    .then(idPackage=>{
        const isAdmin = req.session?.user?.profile=="admin" ? true : false
        const isLoggedIn = req.session?.user ? true :false
        const username = req.session?.user?.username
        const avatar=req.session?.user?.avatar
        res.render('packages/package-details',{package:idPackage,isAdmin,isLoggedIn,username,avatar})
    })
    .catch(err=>(console.log("Error en findbyId: ",err)))
})


//EDITAR

router.get("/package/:id/edit",profileCheck,(req,res,next)=>{
    const isAdmin = req.session?.user?.profile=="admin" ? true : false
    const isLoggedIn = req.session?.user ? true :false
    const username = req.session?.user?.username
    const avatar=req.session?.user?.avatar
    const{id}=req.params
    Package.findById(id)
    .then(package=>{
        res.render("packages/package-edit",{package,isAdmin,isLoggedIn,username,avatar})
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

//Borrar

router.post("/package/:id/delete", (req,res,next)=>{
    const {id} = req.params
    Package.findByIdAndDelete(id)
    .then(()=>{
        console.log("libro borrado")
        res.redirect("/package/list")
    })
    .catch(err=>console.log(err))
})


module.exports=router;