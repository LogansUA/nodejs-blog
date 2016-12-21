import * as express from 'express';
import * as Post from './../models/post';

let router = express.Router();

router.get('/', (req, res) => {
    Post.find({enabled: true}, (err, result) => {
        res.render('home', {
            posts: result,
        });
    });
});

exports = router;
