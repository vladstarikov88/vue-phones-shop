import lodash from 'lodash'
import axios from '@/plugins/axios'
import co from 'co'

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
    getAmountPhones(state) {
      return lodash.reduce(state.cart, (total_amount, {
        amount
      }) => total_amount + amount, 0);
    },
    async getTotalPrice(state) {
      const phones_promises = lodash.map(state.cart, (record) => {
        return axios
          .get("/phone", { id: record.phone_id })
      })
      const phones = await Promise.all(phones_promises).then(response => lodash.map(response, 'data'));  
      
      const result = lodash.reduce(phones, (sum, {price}) => sum + price, 0)

      return result;
    }
  }
}

export default cart