const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

if (process.env.NODE_ENV == 'production') {
  const serviceAcct = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
} else {
  const serviceAcct = require('../../.credentials/firebase-creds.json');
}

initializeApp({
  credential: cert(serviceAcct)
});

const db = getFirestore();

module.exports = {
  db: db
};
