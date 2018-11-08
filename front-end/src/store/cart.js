import lodash from 'lodash'
import axios from '@/plugins/axios'
import phones from '@/assets/dummy/phones'
const cart = {
  namespaced: true,
  state: {
    cart: []
  },
  mutations: {
    addToCartById(state, [phone_id, amount]) {
      const record = lodash.find(state.cart, {
        phone_id
      })
      if (record) {
        record.amount += amount;
      } else {
        state.cart.push({
          phone_id,
          amount,
        })
      }
    },
    removeFromCartById(state, phone_id) {
      lodash.remove(state.cart, {
        phone_id
      })
    },
    changeAmountFromCartById(state, [phone_id, new_amount]) {
      const current = lodash.find(state.cart, {
        phone_id
      })

      if (current) {
        current.amount = new_amount
      }
    }
  },
  actions: {
    addToCartById({
      commit
    }, [phone_id, amount]) {
      commit('addToCartById', [phone_id, amount])
    },
    removeFromCartById({
      commit
    }, phone_id) {
      commit('removeFromCartById', phone_id)
    },
    changeAmountFromCartById({
      commit
    }, [phone_id, new_amount]) {
      commit('changeAmountFromCartById', [phone_id, new_amount])
    }
  },

  getters: {
    countAmount(state) {
      return lodash.reduce(state.cart, (total_amount, {
        amount
      }) => total_amount + amount, 0);
    },
    getTotalPrice(state) {
        return lodash.reduce(state.cart, (sum, {amount, phone_id}) => { 
          const phone_price = lodash.find(phones, {id: phone_id}).price
          return  sum + (phone_price * amount)
        }, 0)
    }
  }
}

export default cart