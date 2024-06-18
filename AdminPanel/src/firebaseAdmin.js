const admin = require("firebase-admin");
const serviceAccount = require("path/to/your/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://final-year-project-96522-default-rtdb.firebaseio.com"
});

module.exports = admin;