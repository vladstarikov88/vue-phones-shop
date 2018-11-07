import Vue from 'vue'
import App from '@/App.vue'
import lodash from 'lodash'
import router from '@/router'
import store from '@/store/index'
import axiosMock from '@/mock/data'
import { library } from '@fortawesome/fontawesome-svg-core'
import faStar from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from './plugins/axios'
import AsyncComputed from 'vue-async-computed'


//library.add(faStart)

Vue.component('font-awesome-icon', FontAwesomeIcon)

 
Vue.use(AsyncComputed)
Vue.set(Vue.prototype, 'axios', axios)
Vue.set(Vue.prototype, 'lodash', lodash)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
