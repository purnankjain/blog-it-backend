const express = require('express')
const POSTS_SERVICE = require('./postsService')
const fileUpload = require('express-fileupload');
var mysql = require('mysql');
var bodyParser = require('body-parser');
const CONSTANTS = require('./constants');
const IMAGE_SERVICE = require('./ImageService');

const app = express()
const port = 8080

var connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.SQL_USER || 'root',
  password: process.env.SQL_PASSWORD || '',
  database: CONSTANTS.DATABASE.NAME
});

const { POSTS_TABLE } = CONSTANTS.DATABASE

app.use(fileUpload({
  createParentPath: true
}));
app.use(bodyParser.json())

app.get('/alive', (req, res) => {
  res.send("I'm Alive")
})

app.get('/posts/:postId', (req, res) => {
  try {
    const { postId } = req.params
    POSTS_SERVICE.getPostById(connection, res, postId)
  } catch (err) {
    console.log({ err });
    res.sendStatus(500)
  }
})

app.get('/posts', (req, res) => {
  try {
    POSTS_SERVICE.getAllPosts(connection, res)
  } catch (err) {
    console.log({ err });
    res.sendStatus(500)
  }
})

app.post('/posts', (req, res) => {
  try {
    const { imageId, title, content } = req.body
    POSTS_SERVICE.createPost(connection, res, imageId, title, content)
  }
  catch (err) {
    console.log(err);
    res.sendStatus(500)
  }
})

app.get('/images/:imageId', (req, res) => {
  try {
    const imageId = req.params.imageId
    IMAGE_SERVICE.getImageById(connection, res, imageId)
  } catch (err) {
    console.log(err);
    res.sendStatus(500)
  }
})

app.post('/images', (req, res) => {
  try {
    const image = req.files.image
    IMAGE_SERVICE.addImage(connection, res, image)
  } catch (err) {
    console.log(err);
    res.sendStatus(500)
  }
})

app.listen(port, () => {
  console.log(`Backend up at http://localhost:${port}`)
})