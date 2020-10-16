const { server, app, getCreatedAt, CREATE, GET } = require('./config')
const connection = require('./database')

app.post('/perfixin/create', (req, res) => {
  let { url } = req.body;
  let client_ip = req?.connection?.remoteAddress;
  connection.query(CREATE, { url, data: JSON.stringify(req.body), client_ip, created_at: getCreatedAt() }, (err, result) => {
    if (err) {
      return res.status(500).json(err)
    }
    res.status(201).json({ id: result.insertId, message: 'success' })
  })
})

app.get('/perfixin', (req, res) => {
  connection.query(GET, (err, result) => {
    if (err) {
      return res.status(500).json(err)
    }
    res.json(result)
  })
})