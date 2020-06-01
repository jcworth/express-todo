module.exports = {
  loggedIn: function(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/')
    }
    return next();
  }
};
