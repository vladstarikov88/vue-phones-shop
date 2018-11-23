import VueFire from 'vuefire'
import firebase from 'firebase'

export default {
    install(Vue) {
        Vue.use(VueFire)
        
        // console.log(firebase)
        
    }
}
firebase.initializeApp({
    apiKey: 'AIzaSyAB_R9ePyK-9CKHLxk4Avhf6tVdQ42Rk5o',
    projectId: 'phones-shop-3f3f7', 
    databaseURL: 'https://dick.firebaseio.com/'
})
export const db = firebase.firestore()