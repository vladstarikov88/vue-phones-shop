import lodash from 'lodash'
const cart = {
  state: {
    cart: []
  },
  mutations: {
    addToCartById(state, [phone_id, amount]) {
      const record = lodash.find(state.cart, { phone_id })
      if(record) {
        record.amount += amount;
      } else {
        state.cart.push({
          phone_id,
          amount,
        })
      }
    }
  },
  actions: {
    addToCartById({commit, }, [phone_id, amount]) {
      commit('addToCartById', [phone_id, amount])
    }
  }
}

export default cart