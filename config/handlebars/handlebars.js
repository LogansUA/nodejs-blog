import * as exphbs from 'express-handlebars';
import helpers from './helpers';

let hbs = exphbs.create({
    defaultLayout: 'main',
    partialsPath: 'views/partials',
    helpers: helpers,
});

export default hbs;
