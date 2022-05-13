const express = require('express')
const axios = require('axios')
var cors = require('cors');
const morgan = require('morgan');

const app = express()
const port = process.env.PORT || 5000
const path = require('path')

const corsOptionsDelegate = require('./utils/allowed-cors');

var usersRouter = require('./routes/users');
var newArtRouter = require('./routes/new');
var testRouter = require('./routes/test');

app.use('/api/users', usersRouter);
app.use('/api/new', newArtRouter);
app.use('/test', testRouter);

app.get('/version', cors(corsOptionsDelegate), (req, res) => {
  res.send('13052022 193900')
})

// Serve static assets if in production
if (process.env.NODE_ENV == 'production') {
  // Set static folder
  app.use(express.static('frontend/dist'));

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('Skeb Explorer')
  })
}

app.use(morgan('dev'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
