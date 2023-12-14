const express = require('express');
const router = express.Router()
const app = express();
const mongoose = require('mongoose')
const Post = require('../models/Post')

app.use(express.json())

// To get all posts in this page
router.get('/', (req, res) => {
    Post.find()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send({message : err.message})
        })
})


// To posts a post in this page
router.post('/add', async (req, res) => {
    try {
        const post = new Post({
            title : req.body.title,
            description : req.body.description
        });

        const savedPost = await post.save();
        res.json(savedPost)

    } catch(err) {
        res.status(500).send({message : err.message})
    }

})

// To get one post in this page
router.get('/:id', async (req, res) => {
    try{
        const onePost = await Post.findById(req.params.id)
        res.send(onePost)
    }catch(err){
        res.send({message : err.message})
    }
    

})

// To update one post in this page
router.patch('/update/:id', async (req, res) => {
   try{
        const postID = req.params.id;

        const {title, description} = req.body;

        const existingPost = await Post.findById(postID);

        if(!existingPost){
            return res.status(404).json({Error : "Post not found!"})
        }

        // checking if the title existe 
        if(title){
            existingPost.title = title;
        }

        if(description){
            existingPost.description = description;
        }


        const updatePost = await existingPost.save();

        res.json({message : "Post updated Succeffuly!", post : updatePost})


   }catch(err){
        res.status(502).json({Error : "Server Error"})
   }
})


// To delete one post 
router.delete('/delete/:id', async (req, res) => {
    try{
        const postID = req.params.id;
        
        const existingPost = await Post.findById(postID);

        if(!existingPost){
            return res.status(404).json({message : "Post Not Found!"})
        }

        await existingPost.deleteOne();

        res.send("Post Deleted!")
    }catch(err){
        res.send({message : err.message});
    }

})


// this to posts any post

module.exports = router