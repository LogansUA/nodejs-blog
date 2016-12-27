import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import parser from 'body-parser';
import passport from 'passport';
import flash from 'connect-flash';
import * as env from 'dotenv';
import passportConfig from './config/passport';

env.config();
mongoose.connect(process.env.DB_URL);

let app = express();
app.set('view engine', 'pug');
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
passportConfig(passport);
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

import mainRouter from './app/routes/main';
import userRouter from './app/routes/authentication';
import adminRouter from './app/routes/admin';

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

    res.render('404');
});

app.listen(process.env.SERVER_PORT);
