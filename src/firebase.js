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

async function uploadUnzippedFileToStorage(localFilePath, remoteFileName) {
  const bucket = admin.storage().bucket();
  await bucket.upload(localFilePath, {
    destination: remoteFileName
  });
  const fileUrl = `${remoteFileName}`;
  console.log(`Archivo subido a ${remoteFileName}`);
  return fileUrl;
}

async function uploadFilesRoutes(files) {
  const db = admin.firestore();
  files.forEach(data => {
    db.collection('files').doc(data.name).set(data);
  });
  console.log("archivos cargados con éxito");
}

module.exports = { uploadFileToStorage, uploadUnzippedFileToStorage, uploadFilesRoutes };