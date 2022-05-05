const router = require("express").Router()
const adminProfile = require("../middleware/profileCheck");
const User = require("../models/User.model");

router.get("/userWelcome", (req, res) => {
        res.render("user/user-welcome")
})

router.get("/userProfile", (req, res) => {
    res.render("user/user-profile")
})

router.get("/user/list",(req,res)=>{
    User.find()
    .then(registeredUsers=>{
        res.render('user/user-list', {userData: registeredUsers} )
    })
    .catch(err=>(console.log("Error en find user: ",err)))
})

//EDITAR permisos
router.get("/user/:id/edit",(req,res,next)=>{
    const{id}=req.params
    User.findById(id)
    .then(findeduser=>{
        res.render("user/user-edit",{findeduser})
    })
    .catch(err=>console.log(err))
})

router.post("/user/:id/edit",(req,res,next)=>{
    const {id}=req.params
    User.findByIdAndUpdate(id, req.body, {new: true})
    .then(()=>{
        res.redirect('/user/list')
    })
    .catch(err=>console.log(err))
})

// Perfil del usuario

router.get("/user", (req, res) => {
    
    const userId = req.session?.user?._id
    User.findById(userId)
    .populate("appointment")
        .then(userFound => {
            console.log(userFound)
            res.render("user/user-details", userFound)
        })
        .catch(error => console.log(error))
})



module.exports = router