"use strict";

const express = require('express');

let router = express.Router();

let Post = require('./../models/post');

router.get('/', (req, res) => {
    Post.find({enabled: true}, (err, result) => {
        res.render('home', {
            posts: result,
        });
    });
});

module.exports = router;
