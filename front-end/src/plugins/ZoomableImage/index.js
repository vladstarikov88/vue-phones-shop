import ZoomImage from './ZoomImage'
import ZoomableImageDirective from './ZoomableImageDirective'
export default {
  install(Vue, option) {
    Vue.directive('zoomable-image',  ZoomableImageDirective);
    Vue.component('zoom-image',  ZoomImage);
  }
}