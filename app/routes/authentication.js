import * as express from 'express';
import * as passport from 'passport';
import * as User from './../models/user';

let router = express.Router();

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

exports = router;