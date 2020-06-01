const dotenv = require('dotenv').config()
const express = require('express');
const port = process.env.PORT || 3000
const expressLayouts = require('express-ejs-layouts');
const app = express()

// ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index.js'));

app.listen(port, console.log(`Server listening on: ${port}`));
