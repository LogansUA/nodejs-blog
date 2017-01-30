import express from 'express';
import constants from './../models/constants';
import Post from './../models/post';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';

let router = express.Router();

router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated() && req.user.role == constants.ROLE_ADMIN) {
        res.render('admin/dashboard');
    } else {
        res.redirect('/');
    }
});
router.route('/post')
    .get((req, res) => {
        Post.find((err, result) => {
            if (err) {
                console.log(err);
            }

            res.render('admin/post/posts', {
                posts: result
            });
        });
    })
    .post((req, res) => {
        let form = new formidable.IncomingForm();

        form.uploadDir = path.join(__dirname, '/../../../uploads');
        form.on('file', (field, file) => {
            let extension = path.extname(file.name);
            let filename = file.path + extension;

            fs.rename(file.path, filename);
        });
        form.on('error', (err) => {
            console.log('An error has occured: \n' + err);
        });
        form.parse(req, (err, fields, files) => {
            let extension = path.extname(files.cover.name);
            let name = path.basename(files.cover.path);
            let filename = name + extension;

            files.cover.path = filename;
            fields.cover = filename;

            // Convert checkbox value to boolean
            fields.enabled = !!fields.enabled;
            fields._createdBy = req.user._id;
            fields._updatedBy = req.user._id;
            let post = new Post(fields);

            Post.create(post, (err, result) => {
                if (err) {
                    console.log(err);
                }

                res.redirect('/admin/post');
            });
        });
    });
router.get('/post/create', (req, res) => {
    res.render('admin/post/create');
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
                console.log(result, result._createdBy);

                res.render('admin/post/view', {
                    post: result
                });
            });
    })
    .post((req, res) => {
        let slug = req.params.postSlug;
        let fields = req.body;

        // Convert checkbox value to boolean
        fields.enabled = !!fields.enabled;
        fields.updatedAt = Date.now();
        fields._updatedBy = req.user._id;

        Post.update({slug: slug}, {$set: req.body}, (err, result) => {
            if (err) {
                console.log(err);
            }
        });

        res.redirect('/admin/post');
    });

router.get('/post/:postSlug/edit', (req, res) => {
    let slug = req.params.postSlug;

    Post.findOne({slug: slug}, (err, result) => {
        if (err) {
            console.log(err);
        }

        res.render('admin/post/edit', {
            post: result
        });
    });
});
router.get('/post/:postSlug/delete', (req, res) => {
    let slug = req.params.postSlug;

    Post.remove({slug: slug})
        .then(result => {
            },
            error => {
            });

    res.redirect('/admin/post');
});

export default router;
