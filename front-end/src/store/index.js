import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

const store = new Vuex.Store({
    plugins: [createLogger(), createPersistedState()],
    modules: {
        cart,
        wishlist,
        user
    }
})