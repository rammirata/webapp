const firebaseAdmin = require("firebase-admin");

const serviceAccount = require("../keys/serviceAccount_privateKey.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

module.exports = firebaseAdmin;
