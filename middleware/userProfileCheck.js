module.exports = (req, res, next) => {
    // checks if the user is logged in when trying to access a specific page
    if (req.isAuthenticated() && req.user.profile === user) {
        return next();
      } else {
        res.redirect('/auth/login');
      }
  };