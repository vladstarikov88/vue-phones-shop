import VueRouter from 'vue-router'
import index from '@/pages/index'
import cart from '@/pages/cart'
import wishlist from '@/pages/wishlist'
import admin from '@/pages/admin'
import confirm_order from '@/pages/confirm_order'
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
  },
  { 
    path: '/confirm_order',
    name: 'confirm_order',
    component: confirm_order, 
  },
  { 
    path: '/admin',
    name: 'admin',
    component: admin, 
  }
]
export default new VueRouter({
  linkExactActiveClass: 'is-active',
  routes,
  mode: 'history',
})