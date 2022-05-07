/** Route: /api/new **/
var express = require('express');
var router = express.Router();
var cors = require('cors');
const axios = require('axios')

const corsOptionsDelegate = require('../utils/allowed-cors');
const axiosGet = require('../utils/axios-utils');

const NEW_WORKS = "https://skeb.jp/api/works?sort=date&genre=art&limit=50&age=0&offset=";

/** GET the list of new art posted in Skeb **/
router.get('/art/:page', cors(corsOptionsDelegate), async (req, res, next) => {
  const worksPage = NEW_WORKS + (req.params.page * 50)
  try {
    let resp = await axiosGet(worksPage);
    res.send(resp);
  } catch (err) {
    res.status(err.code).send(err.message);
  } 
})

module.exports = router;
