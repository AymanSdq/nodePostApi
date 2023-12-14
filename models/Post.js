const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostsSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    dataOfPost : {
        type : Date,
        default : Date.now
    }

})


const Post = mongoose.model('Post', PostsSchema);

module.exports = Post