/** Route: /test  **/
var express = require('express');
var router = express.Router();
var cors = require('cors');
const axios = require('axios');

const corsOptionsDelegate = require('../utils/allowed-cors');
const axiosGet = require('../utils/axios-utils');

const firebase = require('../utils/firebase/firebase-utils');

router.get('/potato', cors(corsOptionsDelegate), async(req, res, next) => {
  try {
    res.send('Potato');  
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});

router.get('/set/:id', cors(corsOptionsDelegate), async(req, res, next) => {
  try {
    const id = req.params.id;
    const docRef = firebase.db.collection('test').doc(id);

    await docRef.set({id: id});
    res.send(`Done setting document ${id}!`);
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});

router.get('/get/:id', cors(corsOptionsDelegate), async(req, res, next) => {
  try {
    const id = req.params.id;
    const doc = await firebase.db.collection('test').doc(id).get();

    if (!doc.exists) {
      res.send(`Document ${id} does not exist!`);
    } else {
      res.send(`Document data: ${JSON.stringify(doc.data())}`);
    }
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});

module.exports = router;
