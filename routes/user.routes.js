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
        const isAdmin = req.session?.user?.profile=="admin" ? true : false
        const isLoggedIn = req.session?.user ? true :false
        const username = req.session?.user?.username
        const avatar=req.session?.user?.avatar
        res.render('user/user-list', {userData: registeredUsers,isAdmin,isLoggedIn,username,avatar} )
    })
    .catch(err=>(console.log("Error en find user: ",err)))
})

//EDITAR permisos
router.get("/user/:id/edit",(req,res,next)=>{
    const{id}=req.params
    User.findById(id)
    .then(findeduser=>{
        const isAdmin = req.session?.user?.profile=="admin" ? true : false
        const isLoggedIn = req.session?.user ? true :false
        const username = req.session?.user?.username
        const avatar=req.session?.user?.avatar
        res.render("user/user-edit",{findeduser,isAdmin,isLoggedIn,username,avatar})
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
            const isAdmin = req.session?.user?.profile=="admin" ? true : false
            const isLoggedIn = req.session?.user ? true :false
            const username = req.session?.user?.username
            const avatar=req.session?.user?.avatar
            res.render("user/user-details", {userFound,isAdmin,isLoggedIn,username,avatar})
        })
        .catch(error => console.log(error))
})





module.exports = router