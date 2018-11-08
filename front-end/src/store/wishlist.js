import moment from 'moment'
import lodash from 'lodash'

const wishlist = {
  namespaced: true,
  state: {
    wishlist: []
  },
  mutations: {
    addToWishlistById(state, phone_id) {
      state.wishlist.push({
        phone_id, 
        date: moment.unix()
      })
    },
    removeFromWishlistById(state, phone_id) {
      const idx = state.wishlist.findIndex(phone => phone.phone_id === phone_id);
      state.wishlist.splice(idx, 1);
    }
  },
  actions: {
    addToWishlistById({commit}, phone_id) {
      commit('addToWishlistById', phone_id)
    },
    removeFromWishlistById({commit}, phone_id) {
      commit('removeFromWishlistById', phone_id)
    },
    toggleToWishlistById({commit, state}, phone_id) {
      state.wishlist.find(el => el.phone_id == phone_id) ?
        commit('removeFromWishlistById', phone_id) :
        commit('addToWishlistById', phone_id)
    }
  },
  getters: {
    getTotalFromWishlist(state) {
      
    }
  }
}

export default wishlist
