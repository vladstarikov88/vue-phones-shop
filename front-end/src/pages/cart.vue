<template>

  <section class="section">
    <div class="container">
      <div v-if="purchases && purchases.length">
        <table-cart :purchases="purchases"></table-cart>
        <router-link :disabled="!has_selected_purchases" class="button" tag="button" to="/confirm_order">
          Перейти к оформлению покупки
        </router-link>
      </div>
      <p class="title is-5" v-else>В корзину пока ни чего не добавленно</p>
    </div>
  </section>

</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import TableCart from '@/components/TableCart'
  import {db} from '@/plugins/FirebasePlugin.js'
  export default {
    name: 'cart',
    data() {
      return {
        phones: [],
        // purchases: []
      }
    },
    components: {
      TableCart
    },
    computed: {
      ...mapState('cart', ['cart']),
      ...mapGetters('cart', ['getSelectedPhones']),
      has_selected_purchases() {
        return this.getSelectedPhones.length
      },
      purchases() {
        const cart_phones =  this.lodash.reduce(this.cart, (acc, {phone_id, amount, selected}) => {
          db.collection("phones").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              if(phone_id == doc.id) {
                const phone = doc.data()
                acc.push( {
                  price: phone.price,
                  name: phone.name,
                  id: phone_id,
                  amount,
                  selected
                })
              }
            })
          })
          return acc
        }, [])
        console.log(cart_phones)
        return cart_phones
      }
    },
    firestore: {
      phones: db.collection('phones'),
    },
    watch: {
      firestore: {
        deep: true,
        handler: 'purchases',
        immediate: true,
      }
    }
  }
</script>