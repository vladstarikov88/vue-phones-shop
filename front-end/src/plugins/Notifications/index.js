import Notifications from './Notifications'
export default {
  install(Vue, options={}) {
    Vue.util.defineReactive(Vue.prototype, '$notifications', []);
    Vue.prototype.$notify = function(notification) {
      this.$notifications.push(notification)
      setTimeout(() => this.$notifications.shift(), options.delay || 1500)
    };
    Vue.component('notifications', Notifications);
  }
}