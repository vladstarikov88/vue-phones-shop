import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'


import cart from './cart'
import wishlist from './wishlist'
import user from './user'

Vue.use(Vuex);
const store = new Vuex.Store({
    plugins: [createLogger(), createPersistedState()],
    modules: {
        cart,
        wishlist,
        user
    }
})

export default store;