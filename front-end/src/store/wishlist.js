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
        date: moment().unix()
      })
    },
    removeFromWishlistById(state, phone_id) {
      const idx = lodash.findIndex(state.wishlist, {phone_id});
      state.wishlist.splice(idx, 1);
    }
  },
  actions: {
    addToWishlistById({commit, dispatch}, phone_id) {
      commit('addToWishlistById', phone_id);
      dispatch('cart/removeFromCartById', phone_id, {root: true})
    },
    removeFromWishlistById({commit, dispatch}, phone_id) {
      commit('removeFromWishlistById', phone_id)
    },
    toggleToWishlistById({commit, state, dispatch}, phone_id) {
      lodash.find(state.wishlist, {phone_id}) ?
        dispatch('removeFromWishlistById', phone_id) :
        dispatch('addToWishlistById', phone_id)
    }
  },
  getters: {
    // 
    //    \/  Памятник \/ 
    // getTotalAmountFromWishlist(state) {
    //   let result = 0;
    //   state.wishlist.forEach(el => result++);
    //   return result
    // },
    getTotalAmountFromWishlist(state) {
      return state.wishlist.length
    },
    getWishlist(state) {
      return state.wishlist
    }
  }
}

export default wishlist
