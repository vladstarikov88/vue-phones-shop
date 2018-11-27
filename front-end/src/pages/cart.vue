<template>

  <section class="section">
    <div class="container">
      <div v-if="purchases && purchases.length" v-show="!loading">
        <table-cart :purchases="purchases"></table-cart>
        <router-link :disabled="!has_selected_purchases" class="button" tag="button" to="/confirm_order">
          Перейти к оформлению покупки
        </router-link>
      </div>
      <p class="title is-5" v-else v-show="!loading">В корзину пока ни чего не добавленно</p>
      <loader v-show="loading"></loader>
    </div>
  </section>

</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import TableCart from '@/components/TableCart'
  import {db} from '@/plugins/FirebasePlugin.js'
  import Loader from '@/components/Loader';

  export default {
    name: 'cart',

    data() {
      return {
        phones: [],
        loading: false,
      }
    },
    components: {
      Loader,
      TableCart
    },
    methods: {
      fetchPhones() {
        const promises = this.lodash.map(this.cart, ({phone_id, amount, selected}) => {
          this.loading = true
          return db.collection('phones')
          .doc(phone_id)
          .get()
          .then(doc => {
            if(doc.exists){
              const phone = doc.data()
              return {
                id: phone_id,
                name: phone.name,
                price: phone.price,
                quantity: phone.quantity,
                amount,
                selected
              }
            }
          })
        })
        Promise.all(promises)
        .then(data => this.phones = data)
        .finally(() => this.loading = false)
      }
    },
    // asyncComputed: {
    //   purchases() {
    //     const phones_queries = this.lodash.map(this.cart, ({phone_id, amount, selected}) => {

    //       return db.collection('phones')
    //         .doc(phone_id)
    //         .get()
    //         .then(doc => {
    //           if (doc.exists) {
    //             const phone = doc.data();
    //             return {
    //               price: phone.price,
    //               name: phone.name,
    //               image_url: phone.image_url,
    //               id: phone_id,
    //               amount,
    //               selected,
    //             }
    //           }

    //         });
    //     });
    //     return Promise.all(phones_queries)
    //   }
    // },
    computed: {
      ...mapState('cart', ['cart']),
      ...mapGetters('cart', ['getSelectedPhones']),
      has_selected_purchases() {
        return this.getSelectedPhones.length
      },
      purchases() {
        const raw_wishes = this.lodash.map(this.cart, ({phone_id, amount, selected}) => {
          const phone = this.lodash.find(this.phones, {id: phone_id})
          if(phone) {
            return {
              price: phone.price,
              name: phone.name,
              image_url: phone.image_url,
              id: phone_id,
              amount, 
              selected
            }
          }
          return null
        })
        return this.lodash.filter(raw_wishes)
      }
    },
    watch: {
      cart: {
        deep: true,
        handler(new_val, old_val) {
          if (new_val != old_val) {
            this.fetchPhones()
          }
        },
        immediate: true,
      }
    }
  }
</script>