import bus from './bus'
import DialogWindow from './DialogWindow'
export default {
  install(Vue, options) {
    Vue.prototype.$confirmPromise = function () {
      return new Promise((resolve, reject) => {
        bus.$emit('call-confirm-window', resolve, reject)
      })
      
    }
    Vue.component('promise-dialog', DialogWindow)
  }
}