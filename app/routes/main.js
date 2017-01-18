import express from 'express';
import Post from './../models/post';

let router = express.Router();

router.get('/', (req, res) => {
    Post.find({enabled: true}, (err, result) => {
        res.render('home', {
            posts: result,
        });
    });
});
router.route('/post/:postSlug')
    .get((req, res) => {
        let slug = req.params.postSlug;

        Post.findOne({slug: slug}, (err, result) => {
            res.render('post/view', {
                post: result
            });
        });
    });

export default router;
