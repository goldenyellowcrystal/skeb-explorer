/** Route: /api/users  **/
var express = require('express');
var router = express.Router();
var cors = require('cors');
const axios = require('axios');

const corsOptionsDelegate = require('../utils/allowed-cors');
const axiosGet = require('../utils/axios-utils');

const USER_PROFILE = "https://skeb.jp/api/users/";

/** GET the list of commission requests that a user has made  **/
router.get('/:id/requests/page/:page', cors(corsOptionsDelegate), async (req, res, next) => {
  const profileReqsLink = USER_PROFILE + req.params.id + "/works/?role=client&sort=date&offset="
    + (req.params.page * 30);
  try {
    let resp = await axiosGet(profileReqsLink);
    res.send(resp);
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});

/** GET the list of artworks that a user has made **/
router.get('/:id/works/page/:page', cors(corsOptionsDelegate), async (req, res, next) => {
  const profileWorkLink = USER_PROFILE + req.params.id + "/works/?role=creator&sort=date&offset="
    + (req.params.page * 30);
  try {
    let resp = await axiosGet(profileWorkLink);
    res.send(resp);
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});

/** GET more information on a specific work of the user **/
router.get('/:id/works/:works_id', cors(corsOptionsDelegate), async (req, res, next) => {
  const profileWorkLink = USER_PROFILE + req.params.id + "/works/" + req.params.works_id 
  try {
    let resp = await axiosGet(profileWorkLink);
    res.send(resp);
  } catch (err) {
    res.status(err.code).send(err.message);
  }
})

/** GET the general information of the user **/
router.get('/:id', cors(corsOptionsDelegate), async (req, res, next) => {
  const profileLink = USER_PROFILE + req.params.id
  try {
    let resp = await axiosGet(profileLink);
    res.send(resp);
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});

module.exports = router;
