import express from 'express';
import Post from './../models/post';
import FroalaEditor from 'wysiwyg-editor-node-sdk';

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
router.post('/upload_image', function (req, res) {
    FroalaEditor.Image.upload(req, '/../uploads/', (err, data) => {
        if (err) {
            return res.send(JSON.stringify(err));
        }

        res.send(data);
    });
});

export default router;
