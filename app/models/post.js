import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

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

export default Post;
