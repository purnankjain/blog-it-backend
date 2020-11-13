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

const getPostById = (connection, res, postId) => {
  if (!postId) {
    res.send([])
    return
  }
  connection.query(`SELECT * FROM ${POSTS_TABLE.NAME} WHERE id = ?`, [postId], (err, result) => {
    if (err) {
      console.log({ err });
      return
    }
    try {
      if (result.length === 0) {
        throw new Error('Invalid Id')
      }
      res.send(result[0])
    } catch (err) {
      console.log({ err });
      res.status(500)
      res.send(`Invalid Post Id: ${postId}`)
    }
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
      res.send(result[0])
    })
  })
}

const updatePost = (connection, res, postId, imageId, title, content) => {
  connection.query(`UPDATE ${POSTS_TABLE.NAME} SET ${POSTS_TABLE.COLUMNS.IMAGE} = ?, ${POSTS_TABLE.COLUMNS.TITLE} = ?, ${POSTS_TABLE.COLUMNS.CONTENT} = ? WHERE ${POSTS_TABLE.COLUMNS.ID} = ?`, [imageId, title, content, postId], (err, result) => {
    if (err) {
      console.log({ err });
      return
    }
    connection.query(`SELECT * FROM ${POSTS_TABLE.NAME} WHERE id = ?`, [postId], (err, result) => {
      if (err) {
        console.log({ err });
        return
      }
      res.status(200)
      res.send(result[0])
    })
  })
}

const deletePost = (connection, res, postId) => {
  connection.query(`DELETE FROM ${POSTS_TABLE.NAME} WHERE ${POSTS_TABLE.COLUMNS.ID} = ?`, [postId], (err, result) => {
    if (err) {
      console.log({ err });
      return
    }
    res.sendStatus(200)
  })
}

const POSTS_SERVICE = {
  getAllPosts
  , getPostById
  , createPost
  , updatePost
  , deletePost
}

module.exports = POSTS_SERVICE