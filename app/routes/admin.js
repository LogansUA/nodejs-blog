import express from 'express';
import constants from './../models/constants';
import postRouter from './admin/post';
import userRouter from './admin/user';

let router = express.Router();

router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated() && req.user.role == constants.ROLE_ADMIN) {
        res.render('admin/dashboard');
    } else {
        res.redirect('/');
    }
});
router.use('/', postRouter);
router.use('/', userRouter);

export default router;
