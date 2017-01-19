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
router.get('/load_images', (req, res) => {
    FroalaEditor.Image.list('/../uploads/', (err, data) => {
        if (err) {
            return res.status(404).end(JSON.stringify(err));
        }

        return res.send(data);
    });
});
router.post('/upload_image', (req, res) => {
    FroalaEditor.Image.upload(req, '/../uploads/', (err, data) => {
        if (err) {
            return res.send(JSON.stringify(err));
        }

        res.send(data);
    });
});
router.post('/delete_image', (req, res) => {
    FroalaEditor.Image.delete(req.body.src, (err) => {
        if (err) {
            return res.status(404).end(JSON.stringify(err));
        }

        return res.end();
    });
});

export default router;
