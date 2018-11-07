import Vue from 'vue'
import App from '@/App.vue'
import lodash from 'lodash'
import router from '@/router'
import store from '@/store/index'
import axiosMock from '@/mock/data'
import axios from 'axios'

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

Vue.set(Vue.prototype, 'axios', axios)
Vue.set(Vue.prototype, 'lodash', lodash)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
