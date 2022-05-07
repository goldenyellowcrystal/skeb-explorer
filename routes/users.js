var express = require('express');
var router = express.Router();
var cors = require('cors');
const axios = require('axios')

const corsOptionsDelegate = require('../utils/allowed-cors');

const USER_PROFILE = "https://skeb.jp/api/users/";
const NEW_WORKS = "https://skeb.jp/api/works?sort=date&genre=art&limit=50&age=0&offset=";

router.get('/:id/requests/page/:page', cors(corsOptionsDelegate), (req, res) => {
  const profileReqsLink = USER_PROFILE + req.params.id + "/works/?role=client&sort=date&offset=" + (req.params.page * 30)
  axios.get(profileReqsLink, {
    headers: {
    Authorization: "Bearer null"
    }
  }).then( resp => {
    res.send(resp.data)
  })
})

router.get('/:id/works/page/:page', cors(corsOptionsDelegate), (req, res) => {
  const profileWorkLink = USER_PROFILE + req.params.id + "/works/?role=creator&sort=date&offset=" + (req.params.page * 30)
  axios.get(profileWorkLink, {
    headers: {
    Authorization: "Bearer null"
    }
  }).then( resp => {
    res.send(resp.data)
  })
})

router.get('/:id/works/:works_id', cors(corsOptionsDelegate), (req, res) => {
  const profileWorkLink = USER_PROFILE + req.params.id + "/works/" + req.params.works_id
  axios.get(profileWorkLink, {
    headers: {
    Authorization: "Bearer null"
    }
  }).then( resp => {
    res.send(resp.data)
  })
})

router.get('/:id', cors(corsOptionsDelegate), (req, res) => {
  const profileLink = USER_PROFILE + req.params.id
  axios.get(profileLink, {
    headers: {
      Authorization: "Bearer null"
    }
  }).then( resp => {
    res.send(resp.data)
  })
})

module.exports = router;
