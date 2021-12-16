const express = require('express')
const axios = require('axios')
var cors = require('cors');

const app = express()
const port = process.env.PORT || 5000
const path = require('path')

var allowedOrigins = ['https://8080-cs-1060709277325-default.cs-asia-east1-jnrc.cloudshell.dev', 'https://fiddle.jshell.net', 'https://skeb-explorer.herokuapp.com', 'http://skeb-explorer.herokuapp.com']
var corsOptionsDelegate = {
  origin: function(origin, callback){
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const userProfile = "https://skeb.jp/api/users/"
const newWorks = "https://skeb.jp/api/works?sort=date&genre=art&limit=50&age=0&offset="

app.get('/api/users/:id/requests/page/:page', cors(corsOptionsDelegate), (req, res) => {
  const profileReqsLink = userProfile + req.params.id + "/works/?role=client&sort=date&offset=" + (req.params.page * 30)
  axios.get(profileReqsLink, {
    headers: {
    Authorization: "Bearer null"
    }
  }).then( resp => {
    res.send(resp.data)
  })
})

app.get('/api/users/:id/works/page/:page', cors(corsOptionsDelegate), (req, res) => {
  const profileWorkLink = userProfile + req.params.id + "/works/?role=creator&sort=date&offset=" + (req.params.page * 30)
  axios.get(profileWorkLink, {
    headers: {
    Authorization: "Bearer null"
    }
  }).then( resp => {
    res.send(resp.data)
  })
})

app.get('/api/users/:id/works/:works_id', cors(corsOptionsDelegate), (req, res) => {
  const profileWorkLink = userProfile + req.params.id + "/works/" + req.params.works_id
  axios.get(profileWorkLink, {
    headers: {
    Authorization: "Bearer null"
    }
  }).then( resp => {
    res.send(resp.data)
  })
})

app.get('/api/users/:id', cors(corsOptionsDelegate), (req, res) => {
  const profileLink = userProfile + req.params.id
  axios.get(profileLink, {
    headers: {
      Authorization: "Bearer null"
    }
  }).then( resp => {
    res.send(resp.data)
  })
})

app.get('/api/new/art/:page', cors(corsOptionsDelegate), (req, res) => {
  const worksPage = newWorks + (req.params.page * 50)
  axios.get(worksPage).then( resp => {
    res.send(resp.data)
  })
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})