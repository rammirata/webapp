const firebaseAdmin = require("../config/firebase-admin");

const createFirebaseUser = async (firebaseUserDetails) => {
  const firebaseUser = await firebaseAdmin
    .auth()
    .createUser(firebaseUserDetails);
  return firebaseUser;
};

const getPasswordResetLink = async (email) => {
  const passwordResetLink = await firebaseAdmin
    .auth()
    .generatePasswordResetLink(email);
  return passwordResetLink;
};

const getFirebaseUser = async (email) => {
  const userRecord = await firebaseAdmin.auth().getUserByEmail(email);
  return userRecord;
}

module.exports = {
  createFirebaseUser,
  getPasswordResetLink,
  getFirebaseUser
};
