import bus from './bus'
import DialogWindow from './DialogWindow'
import mixinNeedConfirmation from './mixinNeedConfirmation'
export default {
  install(Vue, options) {
    Vue.prototype.$confirmPromise = confirmPromise
    Vue.prototype.$wrapperConfirmPromise = wrapperConfirmPromise
    Vue.component('promise-dialog', DialogWindow)
    Vue.mixin(mixinNeedConfirmation)
  }
}
function confirmPromise (message = 'Продолжить?', accept_label = 'Да', cancel_label = 'Нет') {
  return new Promise((resolve, reject) => {
    bus.$emit('call-confirm-window', resolve, reject, message, accept_label, cancel_label)
  })
}
function wrapperConfirmPromise ({handler, message, accept_label, cancel_label}) {
  return  async function(...args) {
    const funcWithContext = handler.bind(this)
    return await confirmPromise(
      (typeof message === 'function') ? message.apply(this): message, 
      accept_label, 
      cancel_label)
      .then(()=>funcWithContext(...args))
      .catch(() => { })
  }
}