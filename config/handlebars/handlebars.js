"use strict";

const exphbs = require('express-handlebars');
const helpers = require('./helpers');

let hbs = exphbs.create({
    defaultLayout: 'main',
    partialsPath: 'views/partials',
    helpers: helpers,
});

module.exports = hbs;