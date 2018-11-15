import VueRouter from 'vue-router'
import index from '@/pages/index'
import cart from '@/pages/cart'
import wishlist from '@/pages/wishlist'
import Vue from 'vue'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/',
    name: 'index',
    component: index, 
  },
  { 
    path: '/cart',
    name: 'cart',
    component: cart, 
  },
  { 
    path: '/wishlist',
    name: 'wishlist',
    component: wishlist, 
  }
]
export default new VueRouter({
  routes,
  mode: 'history',
})