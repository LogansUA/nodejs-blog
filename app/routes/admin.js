"use strict";

const express = require('express');
const constants = require('./../models/constants');

let router = express.Router();

let Post = require('./../models/post');

router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated() && req.user.role == constants.ROLE_ADMIN) {
        res.render('dashboard');
    } else {
        res.redirect('/');
    }
});
router.route('/post')
    .get((req, res) => {
        Post.find((err, result) => {
            res.render('posts', {
                posts: result
            });
        });
    })
    .post((req, res) => {
        let post = new Post(req.body);

        Post.create(post, (err, result) => {
            res.redirect('/admin/post');
        });
    });
router.get('/post/create', (req, res) => {
    res.render('create');
});
router.route('/post/:postSlug')
    .get((req, res) => {
        let slug = req.params.postSlug;

        Post.findOne({slug: slug}, (err, result) => {
            res.render('view', {
                post: result
            });
        });
    })
    .post((req, res) => {
        let slug = req.params.postSlug;

        Post.update({slug: slug}, {$set: req.body}, (err, result) => {
        });

        res.redirect('/admin/post');
    });

router.get('/post/:postSlug/edit', (req, res) => {
    let slug = req.params.postSlug;

    Post.findOne({slug: slug}, (err, result) => {
        res.render('edit', {
            post: result
        });
    });
});
router.get('/post/:postSlug/delete', (req, res) => {
    let slug = req.params.postSlug;

    Post.remove({slug: slug}, (err, result) => {
    });

    res.redirect('/admin/post');
});

module.exports = router;