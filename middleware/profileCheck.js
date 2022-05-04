module.exports = (req, res, next) => {
    // checks if the user is logged in when trying to access a specific page
if(req.session.user){
    if (req.session.user.profile=="admin") {
        return next()
      }
      else
      return res.redirect("/auth/login");
    }
    else
      return res.redirect("/auth/login");
};

