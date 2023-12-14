const express = require('express');
const app = express();
const mongoose = require('mongoose')
const postsRouter = require('./routes/posts')


app.use(express.json()); 

// Calling the routes posts
app.use('/posts', postsRouter)

// Connection to database
mongoose.connect('mongodb://127.0.0.1:27017/blogs');
mongoose.connection.on('connected', () => {
    console.log("Connected to database")
})

// use Json


app.get('/', (req, res) => {
    res.send("You are in the home page")
})


app.listen(
    8080,
    console.log('Server is Up : http://localhost:8080')
)