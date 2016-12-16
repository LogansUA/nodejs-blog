"use strict";

const express = require('express');
const passport = require('passport');

let router = express.Router();

let User = require('./../models/user');

router.route('/register')
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('register');
        }
    })
    .post((req, res) => {
        if (req.isAuthenticated()) {
            res.redirect('/');
        } else {
            User.register(new User({
                email: req.body.email,
            }), req.body.password, (err, user) => {
                if (err) {
                    console.error(err);
                }

                passport.authenticate('local')(req, res, () => {
                    res.redirect('/admin/dashboard');
                });
            });
        }
    });

router.route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post(passport.authenticate('local', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/user/login',
    }));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;