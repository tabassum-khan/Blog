const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title for the post'],
        trim: true
    },

    content: {
        type: String,
        required: [true, 'Please enter the content for the post'],
        trim: true
    },

    date: String,

    remainingDate: String
    
}, { timestamps: true });

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;