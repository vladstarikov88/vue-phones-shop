import Vue from 'vue'
import App from '@/App.vue'
import lodash from 'lodash'
import router from '@/router'
import store from '@/store/index'
import axiosMock from '@/mock/data'
import AsyncComputed from 'vue-async-computed'
import vClickOutside from 'v-click-outside'
import VeeValidate from 'vee-validate';
import AxiosPlugin from './plugins/AxiosPlugin'
 
Vue.use(vClickOutside)
Vue.use(AsyncComputed)
Vue.use(VeeValidate)
Vue.use(AxiosPlugin, { 
  store
})

Vue.set(Vue.prototype, 'lodash', lodash)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
