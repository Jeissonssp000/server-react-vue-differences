const admin = require("firebase-admin");

var serviceAccount = require("../firebase.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let listMonth = []

async function startRealTimeListener() {
  const db = admin.firestore();
  const ref = db.collection('files');

  if (global.listener) global.listener();
  global.listener = ref.onSnapshot(querySnapshot => {
    console.log('Documentos actualizados:', querySnapshot.size);
    const list = []
    querySnapshot.forEach(doc => {
      const data = doc.data()
      list.push(data)
    });
    listMonth = list
  }, error => {
    console.error('Error al escuchar la colección:', error);
  });
}

function getListMonth() {
  return listMonth
}

module.exports = { startRealTimeListener, getListMonth };