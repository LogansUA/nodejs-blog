import * as exphbs from 'express-handlebars';
import * as helpers from './helpers';

let hbs = exphbs.create({
    defaultLayout: 'main',
    partialsPath: 'views/partials',
    helpers: helpers,
});

exports = hbs;