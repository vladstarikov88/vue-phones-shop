
import firebase from 'firebase'
firebase.initializeApp({
  apiKey: 'AIzaSyAB_R9ePyK-9CKHLxk4Avhf6tVdQ42Rk5o',
  projectId: 'phones-shop-3f3f7',
  databaseURL: 'https://phones-shop-3f3f7.firebaseio.com/'
})
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
export { db };
