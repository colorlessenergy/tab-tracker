const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
// models folder has index.js file return object with sequelize attribute
const {sequelize} = require('./models')
const config = require('./config/config')
const app = express()
// logs data about the request made 'headers'
app.use(morgan('combined'))
// parse any json that is sent in
app.use(bodyParser.json())
// want a server to be hosted on a different domain. any client hit server. allows any host or client to access this
app.use(cors())

// gets the route of from routes.js file
require('./routes')(app)

sequelize.sync({force: false})
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })
