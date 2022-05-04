const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  const isAdmin = req.session?.user?.profile=="admin" ? true : false
  const isLoggedIn = req.session?.user ? true :false
  const username = req.session?.user?.username
  const avatar=req.session?.user?.avatar
  res.render("index",{isAdmin,isLoggedIn,username,avatar});

});

module.exports = router;
