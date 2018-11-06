import Vue from 'vue'
import App from '@/App.vue'
import lodash from 'lodash'
import store from '@/store/index'

Vue.set(Vue.prototype, 'lodash', lodash)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
