import moment from 'moment'

const wishlist = {
  state: {
    wishlist: []
  },
  mutations: {
    addToWishlistById(state, phone_id) {

      state.wishlist.push({
        phone_id, 
        date: moment.unix()
      })
    }
  },
  actions: {
    addToWishlistById({commit}, phone_id) {
      commit('addToWishlistById', phone_id)
    }
  }
}

export default wishlist