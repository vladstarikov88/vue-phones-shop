<template>

  <section class="section">
    <div class="container">
      <div v-if="purchases && purchases.length" >
        <table-cart :purchases="purchases"></table-cart>
        <button class="button" v-if="selected_purchases.length">
          <router-link to="/confirm_order">
            Перейти к оформлению покупки
          </router-link>
        </button>  
      </div>
      <p class="title is-5" v-else>В корзину пока ни чего не добавленно</p>
    </div>
  </section>

</template>

<script>
import {mapState, mapActions} from 'vuex'
import TableCart from '@/components/TableCart'
export default  {
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
      Promise.all(promises).then( data => {
        this.phones = data
      })
    }
  },
  computed: {
    ...mapState('cart', ['cart']),
    purchases() {
      const raw_purchases = this.lodash.map(this.cart, ({phone_id, amount, selected}) => {
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
      return this.lodash.filter(raw_purchases)
    },
    selected_purchases() {
      return this.purchases.filter(item => item.selected == true)
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