"use strict";

const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

let postSchema = mongoose.Schema({
    title: {
        type: String,
        max: 250,
        required: true,
    },
    slug: {
        type: String,
        slug: 'title'
    },
    description: String,
    enabled: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});
let Post = mongoose.model('Post', postSchema);

module.exports = Post;