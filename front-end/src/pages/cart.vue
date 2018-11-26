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

  export default {
    name: 'cart',
    data() {
      return {
        phones: []
      }
    },
    components: {
      TableCart
    },
    methods: {
      fetchPhones() {
        const promises = this.lodash.map(this.cart, ({phone_id}) =>
          this.axios.get('/phone', {id: phone_id})
            .then(({data}) => data)
        );
        Promise.all(promises).then(data => {
          this.phones = data
        })
      }
    },
    computed: {
      ...mapState('cart', ['cart']),
      ...mapGetters('cart', ['getSelectedPhones']),
      has_selected_purchases() {
        return this.getSelectedPhones.length
      },
    },
    asyncComputed: {
      purchases() {
        return this.lodash.reduce(this.cart, (acc, {phone_id, amount, selected}) => {
          this.axios('/phone', {id: phone_id}).then(res => {
            const phone = res.data;
            acc.push({
              price: phone.price,
              name: phone.name,
              image_url: phone.image_url,
              id: phone_id,
              amount,
              selected
            });
          });

          return acc
        }, [])
      },
    },
    watch: {
      cart: {
        deep: true,
        handler: 'fetchPhones',
        immediate: true,
      }
    }
  }
</script>