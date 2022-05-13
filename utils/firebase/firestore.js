const firebase = require('./firebase-utils');
const { FieldValue } = require('firebase-admin/firestore');

const set = async(table, key, data) => {
  const doc = await firebase.db.collection(table).doc(key).get();
  data.created = (doc.exists && !!doc.data().created) ? doc.data().created :
    FieldValue.serverTimestamp();
  data.last_updated = FieldValue.serverTimestamp(); 
  await firebase.db.collection(table).doc(key).set(data);
};

const get = async(table, key) => {
  const doc = await firebase.db.collection(table).doc(key).get();
  return (doc.exists) ? doc.data() : {};
};

module.exports = {
  set: set,
  get: get
};
