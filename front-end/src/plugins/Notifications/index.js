import Notifications from './Notifications'
export default {
  install(Vue, options) {
    Vue.util.defineReactive(Vue.prototype, '$notifications', []);
    Vue.prototype.$notify = function(notification) {
      this.$notifications.push(notification)
    };
    Vue.component('notifications', Notifications);
  }
}