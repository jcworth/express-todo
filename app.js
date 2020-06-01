const dotenv = require('dotenv').config()
const express = require('express');
const port = process.env.PORT || 3000
const expressLayouts = require('express-ejs-layouts');
const app = express()


// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));

// ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');


// MongoDB connection
const mongoose = require('mongoose');
const mongoUri = process.env.MONGOURI;
mongoose.connect(mongoUri, {useNewUrlParser: true})
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

app.listen(port, console.log(`Server listening on: ${port}`));
