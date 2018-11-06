import Vue from 'vue'
import App from './App.vue'
import lodash from 'lodash'

Vue.set(Vue.prototype, 'lodash', lodash)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
