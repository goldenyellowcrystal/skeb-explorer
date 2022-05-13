/** Route: /test  **/
var express = require('express');
var router = express.Router();
var cors = require('cors');
const axios = require('axios');

const corsOptionsDelegate = require('../utils/allowed-cors');
const axiosGet = require('../utils/axios-utils');

const firebase = require('../utils/firebase/firebase-utils');
const db = require('../utils/firebase/firestore');

router.get('/potato', cors(corsOptionsDelegate), async(req, res, next) => {
  try {
    res.send('Potato');  
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});

router.get('/set/:id', cors(corsOptionsDelegate), async(req, res, next) => {
  try {
    await db.set('test', req.params.id, {id: req.params.id});
    res.send(`Done setting document ${req.params.id}!`);
  } catch (err) {
    if (err.code) {
      res.status(err.code).send(err.message);
    } else {
      console.log('An error has occurred', err);
      res.status(500).send('SADGE');
    }
  }
});

router.get('/get/:id', cors(corsOptionsDelegate), async(req, res, next) => {
  try {
    let doc = await db.get('test', req.params.id);
    res.send(`Document ${req.params.id} data: ${JSON.stringify(doc)}`);
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});

module.exports = router;
