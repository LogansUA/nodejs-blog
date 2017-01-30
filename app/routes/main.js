import express from 'express';
import Post from './../models/post';
import FroalaEditor from 'wysiwyg-editor-node-sdk';
import moment from 'moment';

let router = express.Router();

router.get('/', (req, res) => {
    Post.find({enabled: true})
        .sort({createdAt: 'desc'})
        .exec((err, result) => {
            res.render('home', {
                posts: result,
            });
        })
        .then(result => {
            },
            error => {
            });
});
router.route('/post/:postSlug')
    .get((req, res) => {
        let slug = req.params.postSlug;

        Post.findOne({slug: slug})
            .populate('_createdBy')
            .exec((err, result) => {
                if (err) {
                    console.log(err);
                }
                result.parsedCreatedAt = moment(result.createdAt.toISOString()).format('LL');

                res.render('post/view', {
                    post: result
                });
            })
            .then(result => {
                },
                error => {
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
