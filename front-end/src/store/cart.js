import lodash from 'lodash'
import axios from 'axios'
import phones from '@/assets/dummy/phones'
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
      });
      if (record) {
        record.amount += amount;
      } else {
        state.cart.push({
          phone_id,
          amount,
          selected: true
        })
      }
    },
    removeFromCartById(state, phone_id) {
      const idx = lodash.findIndex(state.cart, {phone_id});
      if(~idx){
        state.cart.splice(idx, 1);
      }
    },
    removeFromCartByIds(state, phone_ids) {
      lodash.forEach(phone_ids, (phone_id) => {
        const idx = lodash.findIndex(state.cart, {phone_id});
        console.log(idx, phone_id, state.cart);
        if(~idx){
          state.cart.splice(idx, 1);
        }
      })

    },
    changeAmountFromCartById(state, [phone_id, new_amount]) {
      const current = lodash.find(state.cart, {phone_id})

      if (current) {
        current.amount = new_amount
      }
    },
    markPurchaseById(state, phone_id) {
      const current = lodash.find(state.cart, {phone_id})
      current.selected = !current.selected
    }
  },
  actions: {
    addToCartById({
      commit,
      dispatch
    }, [phone_id, amount]) {
      commit('addToCartById', [phone_id, amount]);
      dispatch('wishlist/removeFromWishlistById', phone_id, { root: true })
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
    },
    clearCart({commit}) {
      commit('clearCart')
    },
    removeSelectedFromCart({commit, getters}) {
      const indexes = lodash.map(getters.getSelectedPhones,'phone_id');
      commit('removeFromCartByIds', indexes)
    },
    markPurchaseById({commit}, phone_id) {
      commit('markPurchaseById', phone_id)
    }
  },

  getters: {
    getTotalAmountPhones(state) {
      return lodash.reduce(state.cart, (total_amount, {
        amount
      }) => total_amount + amount, 0);
    },
    getSelectedPhones(state) {
      return lodash.filter(state.cart, {selected: true});
    },
    // getTotalPrice(state) {
    //     return lodash.reduce(state.cart, (sum, {amount, phone_id}) => { 
    //       const phone_price = lodash.find(phones, {id: phone_id}).price
    //       return  sum + (phone_price * amount)
    //     }, 0)
    // },
    async promiseTotalPrice(state) {
      return await co(function * (){
          const prices = yield lodash.map(state.cart, ({phone_id, amount}) => {
          return axios.get('phone',{id: phone_id}).then(res=>res.data.price * amount)
        });
          return lodash.sum(prices)
      })
    }
  }
};

export default cart