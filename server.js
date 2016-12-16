"use strict";

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const parser = require('body-parser');
const path = require('path');
const env = require('dotenv').config({
    verbose: true,
    path: path.join('config', '.env'),
});
const passport = require('passport');
const flash = require('connect-flash');

mongoose.connect(process.env.DB_URL);

let app = express();
app.engine('handlebars', require('./config/handlebars/handlebars').engine);
app.set('view engine', 'handlebars');
app.use(flash());
app.use(cookieParser('keyboard cat'));
app.use(session({
    secret: 'Secret',
    resave: true,
    saveUninitialized: true,
}));
app.use(parser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

let mainRouter = require('./app/routes/main');
let userRouter = require('./app/routes/authentication');
let adminRouter = require('./app/routes/admin');

app.use('/', mainRouter);
app.use('/user', userRouter);
app.use('/admin', (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}, adminRouter);
app.use((req, res) => {
    res.status(404);

    res.render(404);
});

app.listen(process.env.SERVER_PORT);
