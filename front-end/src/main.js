import Vue from 'vue'
import App from '@/App.vue'
import lodash from 'lodash'
import router from '@/router'
import store from '@/store/index'
import axiosMock from '@/mock/data'
import axios from './plugins/axios'
import AsyncComputed from 'vue-async-computed'
import vClickOutside from 'v-click-outside'
 
Vue.use(vClickOutside)
Vue.use(AsyncComputed)
Vue.set(Vue.prototype, 'axios', axios)
Vue.set(Vue.prototype, 'lodash', lodash)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
