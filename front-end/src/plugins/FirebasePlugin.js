import VueFire from 'vuefire'
import firebase from 'firebase/app'

export default {
    install(Vue) {
        Vue.use(VueFire)
        firebase.initializeApp({
            apiKey: 'AIzaSyAB_R9ePyK-9CKHLxk4Avhf6tVdQ42Rk5o',
            projectId: 'phones-shop-3f3f7', 
            databaseURL: 'https://dick.firebaseio.com/'
        })

        console.log(firebase)
        
        Vue.prototype.$db = firebase.firestore()
    }
}