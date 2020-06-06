const dotenv = require('dotenv').config()
const express = require('express');
const passport = require('passport');
const path = require('path');
const port = process.env.PORT || 3000
const expressLayouts = require('express-ejs-layouts');

const app = express()

//  Webpack dev middleware
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config');
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));
app.use(webpackHotMiddleware(compiler));

// Passport config
require('./config/passport.js')(passport);

// body-parser - request body reading
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));

// multer - multipart form reading
const multer = require('multer');
const upload = multer();
app.use(upload.array());

// Method override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// ejs templating
app.use(expressLayouts);
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'ejs');

// Static file serving - assets
// app.use(express.static('public'));

// MongoDB connection
const mongoose = require('mongoose');
const mongoUri = process.env.MONGOURI;
mongoose.connect(mongoUri, {useNewUrlParser: true})
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Session handling
const session = require('express-session');
app.use(session({
  secret: 'random secret',
  resave: true,
  saveUninitialized: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Glocal variables - accessible in views
app.use((req, res, next) => {
  // Check for current user
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/tasks', require('./routes/tasks.js'));
app.all("*", (req, res) => {
  return res.status(404).send('Page not found')
});

app.listen(port, console.log(`Server listening on: ${port}`));
