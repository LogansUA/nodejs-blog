import User from './../../models/user';
import express from 'express';

let router = express.Router();

router.route('/user')
    .get((req, res) => {
        User.find((err, result) => {
            if (err) {
                console.log(err);
            }

            res.render('admin/user/list', {
                users: result
            });
        });
    })
    .post((req, res) => {
        let fields = req.body;
        let user = new User(fields);

        user.setPassword(fields.password, (err, user) => {
            user.save().then(result => {}, error => {});
        });
        User.create(user, (err, result) => {
            if (err) {
                console.log(err);
            }

            res.redirect('/admin/user');
        });
    });
router.get('/user/create', (req, res) => {
    res.render('admin/user/create');
});
router.post('/user/:userId', (req, res) => {
        let userId = req.params.userId;
        let fields = req.body;

        User.findOne({_id: userId}, (err, user) => {
            user.update({$set: fields});

            user.setPassword(fields.password, (err, user) => {
                user.save().then(result => {}, error => {});
            });
        });

        res.redirect('/admin/user');
    });
router.get('/user/:userId/edit', (req, res) => {
    let userId = req.params.userId;

    User.findOne({_id: userId}, (err, result) => {
        if (err) {
            console.log(err);
        }

        res.render('admin/user/edit', {
            person: result
        });
    });
});
router.get('/user/:userId/delete', (req, res) => {
    let userId = req.params.userId;

    User.remove({_id: userId}).then(result => {}, error => {});

    res.redirect('/admin/user');
});

export default router;
