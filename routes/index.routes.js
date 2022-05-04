const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  const isAdmin = req.session?.user?.profile=="admin" ? true : false
  const isUser = req.session?.user?.profile=="user" ? true : false
  res.render("index",{isAdmin,isUser});

});

module.exports = router;
