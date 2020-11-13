const fs = require('fs')
const md5 = require('md5')
const CONSTANTS = require('./constants')

const { IMAGE_TABLE } = CONSTANTS.DATABASE

const addImage = (connection, res, image) => {
  const name = md5(Date.now())
  image.mv(`./uploads/${name}.jpg`)
  connection.query(`INSERT INTO ${IMAGE_TABLE.NAME}(${IMAGE_TABLE.COLUMNS.NAME}) VALUES(?)`, [name], (err, result) => {
    if (err) {
      console.log({ err });
      return
    }
    const insertId = result.insertId
    connection.query(`SELECT * FROM ${IMAGE_TABLE.NAME} WHERE id = ?`, [insertId], (err, result) => {
      if (err) {
        console.log({ err });
        return
      }
      res.status(201)
      res.send(result[0])
    })
  })
}

const getImageById = (connection, res, id) => {
  connection.query(`SELECT ${IMAGE_TABLE.COLUMNS.NAME} FROM ${IMAGE_TABLE.NAME} WHERE id = ?`, [id], (err, result) => {
    if (err) {
      console.log({ err });
      return
    }
    if (result.length === 0) {
      res.send('')
    }
    const { name } = result[0]
    const file = `${__dirname}/uploads/${name}.jpg`
    res.download(file)
  })
}

const IMAGE_SERVICE = {
  addImage
  , getImageById
}

module.exports = IMAGE_SERVICE