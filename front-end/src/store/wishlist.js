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
    }
  },
  actions: {
    addToWishlistById({commit}, phone_id) {
      commit('addToWishlistById', phone_id)
    }
  },
  getter: {
    countAmount(state) {
      return lodash.reduce(state.wishlist, (total_amount, {amount}) => {
        return total_amount + amount
      }, 0);
    }
  }
}

export default wishlist
