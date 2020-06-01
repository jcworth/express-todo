module.exports = {
  loggedIn: function(req, res, next) {
    if (req.user) {
      res.redirect('/')
    }
    return next();
  }
};
