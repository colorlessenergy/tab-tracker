const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
// logs data about the request made 'headers'
app.use(morgan('combined'))
// parse any json that is sent in
app.use(bodyParser.json())
// want a server to be hosted on a different domain. any client hit server. allows any host or client to access this
app.use(cors())

// handle endpoint of status 'hit'
app.post('/register', (req, res) => {
  res.send({
    message: `Hello ${req.body.email}! your user was registered! have fun!`
  })
})

app.listen(process.env.PORT || 8081)
