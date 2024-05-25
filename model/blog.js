const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
 title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    coverImageUrl: {
        type: String,
        required: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User", 
    },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
