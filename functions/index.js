const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  // eslint-disable-next-line object-curly-spacing
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
