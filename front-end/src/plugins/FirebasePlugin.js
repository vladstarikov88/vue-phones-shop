
import firebase from 'firebase'
import "firebase/firestore"
firebase.initializeApp({
  apiKey: 'AIzaSyAB_R9ePyK-9CKHLxk4Avhf6tVdQ42Rk5o',
  projectId: 'phones-shop-3f3f7',
  databaseURL: 'https://phones-shop-3f3f7.firebaseio.com/',
  storageBucket: 'gs://phones-shop-3f3f7.appspot.com'
})
const db = firebase.firestore();
const storage = firebase.storage();
db.settings({ timestampsInSnapshots: true });
export { db, storage };
