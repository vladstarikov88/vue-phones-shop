import ZoomImage from './ZoomImage'
import ZoomableImageDirective from './ZoomableImageDirective'
export default {
  install(Vue, option) {
    Vue.Directive('zoomable-image', ZoomImage);
    Vue.component('zoom-image', ZoomableImageDirective);
  }
}