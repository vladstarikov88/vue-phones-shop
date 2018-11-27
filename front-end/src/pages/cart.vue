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
      }
    },
    components: {
      TableCart
    },
    asyncComputed: {
      purchases() {
        const phones_queries = this.lodash.map(this.cart, ({phone_id, amount, selected})=>{
          return db.collection('phones')
            .where('id','==', phone_id)
            .get()
            .then( snapshot => {
              return this.lodash.map(snapshot.docs, (doc) => {
                if(doc.exists) {
                  const phone  = doc.data();
                  return {
                    price: phone.price,
                    name: phone.name,
                    image_url: phone.image_url,
                    id: phone_id,
                    amount,
                    selected,
                  }
                }
              });
            });
        });
        return Promise.all(phones_queries).then(this.lodash.flatten);
      }
    },
    computed: {
      ...mapState('cart', ['cart']),
      ...mapGetters('cart', ['getSelectedPhones']),
      has_selected_purchases() {
        return this.getSelectedPhones.length
      },
    },
  }
</script>