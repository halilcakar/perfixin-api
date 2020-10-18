require('dotenv').config()
const fs = require('fs')

const APP_ENV = process.env.APP_ENV
const PORT = process.env.PORT
const SSL_KEY = process.env.SSL_KEY
const SSL_CERT = process.env.SSL_CERT

let protocol = 'http'
let certificateOptions = {}
if (APP_ENV === 'production' && SSL_KEY) {
  protocol = 'https';
  certificateOptions = {
    key: fs.readFileSync(SSL_KEY),
    cert: fs.readFileSync(SSL_CERT),
  }
}

const express = require('express')
const app = express()
app.use(require('cors')())
app.use(express.json())

const server = require(protocol).createServer(certificateOptions, app)

server.listen(PORT || 8080, () => {
  console.clear()
  console.log(`Example app listening at http://localhost:${PORT}`)
})


const TABLE_NAME = 'perf'
const CREATE = `INSERT INTO ${TABLE_NAME} SET ?`
const GET_ALL = `SELECT * FROM ${TABLE_NAME}`
const GET_30MIN = `SELECT * FROM ${TABLE_NAME} WHERE created_at > date_sub(now(), interval 30 minute);`

const getCreatedAt = () => {
  let date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

module.exports = {
  app, server, getCreatedAt,
  CREATE, GET_ALL, GET_30MIN
}