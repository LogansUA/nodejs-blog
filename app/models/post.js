import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

let postSchema = mongoose.Schema({
    title: {
        type: String,
        max: 250,
        required: true,
    },
    cover: {
        type: String,
        max: 50,
    },
    slug: {
        type: String,
        slug: 'title'
    },
    description: String,
    enabled: {
        type: Boolean,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    _createdBy: {
        type: String,
        ref: 'User',
    },
    _updatedBy: {
        type: String,
        ref: 'User',
    },
});
let Post = mongoose.model('Post', postSchema);

export default Post;
