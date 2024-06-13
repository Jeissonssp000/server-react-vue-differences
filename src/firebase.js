const admin = require("firebase-admin");

var serviceAccount = require("../firebase.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://react-vue-differences.appspot.com"
});

async function uploadFileToStorage(localFilePath, remoteFileName) {
  const bucket = admin.storage().bucket();
  await bucket.upload(localFilePath, {
    destination: remoteFileName,
    metadata: {
      contentType: 'application/zip'
    }
  });
  console.log(`Archivo subido a ${remoteFileName}`);
}

module.exports = { uploadFileToStorage };