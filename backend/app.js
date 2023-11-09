const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

// DB Connection
const conn = require('./db/connection')
conn()

// Routes
const routes = require('./routes/router')

app.use('/api', routes)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
}
)
