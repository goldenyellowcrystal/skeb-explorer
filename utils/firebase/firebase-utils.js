const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

var serviceAcct;
if (process.env.NODE_ENV == 'production') {
  serviceAcct = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
} else {
  serviceAcct = require('../../.credentials/firebase-creds.json');
}

initializeApp({
  credential: cert(serviceAcct)
});

const db = getFirestore();

module.exports = {
  db: db
};
