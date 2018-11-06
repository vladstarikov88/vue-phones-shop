import Vue from 'vue'
import Vuex from 'vuex'
import App from '@/App.vue'
import lodash from 'lodash'
import store from '@/store/index'

Vue.set(Vue.prototype, 'lodash', lodash)
Vue.config.productionTip = false
Vue.use(Vuex);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
