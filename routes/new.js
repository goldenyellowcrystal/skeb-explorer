var express = require('express');
var router = express.Router();
var cors = require('cors');
const axios = require('axios')

const corsOptionsDelegate = require('../utils/allowed-cors');

const NEW_WORKS = "https://skeb.jp/api/works?sort=date&genre=art&limit=50&age=0&offset=";


router.get('/art/:page', cors(corsOptionsDelegate), (req, res) => {
  const worksPage = NEW_WORKS + (req.params.page * 50)
  axios.get(worksPage).then( resp => {
    res.send(resp.data)
  })
})

module.exports = router;
