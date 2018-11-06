import VueRouter from 'vue-router'
import index from '@/pages/index'
import Vue from 'vue'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/',
    name: 'index',
    component: index, 
  }
]
export default new VueRouter({
  routes,
  mode: 'history',
})