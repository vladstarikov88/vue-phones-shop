import DynamicFromNow from './DynamicFromNow'
export default {
  install(Vue, options) {
    Vue.prototype.$listeners_moment = [];
    Vue.prototype.$interval_moment = null;
    Vue.prototype.$registerMoment = function (listener) {
      this.$listeners_moment.push(listener)
      if (!this.$interval_moment) {
        this.$interval_moment = setInterval(() => {
          this.$listeners_moment.forEach(listener => {
            listener();
          });
        }, 2000)
      }
    };
    Vue.prototype.$unregisterMoment = function(listener) {
      const index = this.$listeners_moment.indexOf(listener);
      if(~index){
        this.$listeners_moment.splice(index, 1);
      }
      if(this.$listeners_moment.length === 0) {
        clearInterval(this.$interval_moment);
      }
    }
    Vue.component('dynamic-from-now', DynamicFromNow)
  }
}