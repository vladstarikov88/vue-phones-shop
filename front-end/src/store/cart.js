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
    },
    removeFromCartById(state, phone_id) {
      lodash.remove(state.cart, {phone_id})
    },
    changeAmountFromCartById(state, [phone_id, new_amount]) {
      const current = lodash.find(state.cart, {phone_id}) 

      if (current) {
        current.amount = new_amount
      }
    }
  },
  actions: {
    addToCartById({commit}, [phone_id, amount]) {
      commit('addToCartById', [phone_id, amount])
    },
    removeFromCartById({commit}, phone_id) {
      commit('removeFromCartById', phone_id)
    },
    changeAmountFromCartById({commit}, [phone_id, new_amount]) {
      commit('changeAmountFromCartById', [phone_id, new_amount])
    }
  },
  getter: {
    countAmount(state) {
      return lodash.reduce(state.cart, (total_amount, {amount}) => total_amount + amount, 0);
    }
  }
}

export default cart