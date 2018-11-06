import Vue from 'vue'
import App from '@/App.vue'
import lodash from 'lodash'
import router from '@/router'
import store from '@/store/index'
import VueResource from 'vue-resource'
import VueResourceMock from 'vue-resource-mock'
import MockData from './mock/data.js'

Vue.use(VueResource)

if (process.env.NODE_ENV === 'development') {
  Vue.use(VueResourceMock, MockData)
}
Vue.set(Vue.prototype, 'lodash', lodash)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
