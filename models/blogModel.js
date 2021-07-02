const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,
    content: String,
    date: String,
    remainingDate: String
}, { timestamps: true });

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;