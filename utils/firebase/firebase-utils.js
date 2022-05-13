const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAcct = require('../../.credentials/firebase-creds.json');

initializeApp({
  credential: cert(serviceAcct)
});

const db = getFirestore();

module.exports = {
  db: db
};
