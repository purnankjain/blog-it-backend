const CONSTANTS = require("./constants");

const { POSTS_TABLE } = CONSTANTS.DATABASE

const getAllPosts = (connection, res) => {
  connection.query(`SELECT * FROM ${POSTS_TABLE.NAME}`, (err, result) => {
    if (err) {
      console.log({ err });
      return
    }
    res.send(result)
  })
}

const getPostById = (connection, res, id) => {
  if (!id) {
    res.send([])
    return
  }
  connection.query(`SELECT * FROM ${POSTS_TABLE.NAME} WHERE id = ?`, [postId], (err, result) => {
    if (err) {
      console.log({ err });
      return
    }
    res.send(result)
  })
}

const createPost = (connection, res, imageId, title, content) => {
  connection.query(`INSERT INTO ${POSTS_TABLE.NAME}(${POSTS_TABLE.COLUMNS.IMAGE}, ${POSTS_TABLE.COLUMNS.TITLE}, ${POSTS_TABLE.COLUMNS.CONTENT}) VALUES (?, ?, ?)`, [imageId, title, content], (err, result) => {
    if (err) {
      console.log({ err });
      return
    }
    const insertId = result.insertId
    connection.query(`SELECT * FROM ${POSTS_TABLE.NAME} WHERE id = ?`, [insertId], (err, result) => {
      if (err) {
        console.log({ err });
        return
      }
      res.status(201)
      res.send(result)
    })
  })
}

const POSTS_SERVICE = {
  getAllPosts
  , getPostById
  , createPost
}

module.exports = POSTS_SERVICE