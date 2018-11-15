<template>

  <section class="section">
    <div v-if="purchases && purchases.length" >
      <table class="table is-fullwidth">
        <thead>
        <tr>
            <th>Миниатюра</th>
            <th>Модель</th>
            <th>Количество</th>
            <th>Стоимость</th>
            <th>Редактировать</th>
        </tr>
        </thead>
        <tbody>
            <table-cart-row 
              v-for="purchase in purchases" 
              :key="purchase.id"
              :purchase="purchase">
            </table-cart-row> 
        </tbody>
      </table>
      <button class="button">
        <router-link to="/confirm_order">
          Перейти к оформлению покупки
        </router-link>
      </button>
    </div>
    <p class="title is-5" v-else>В корзину пока ни чего не добавленно</p>
  </section>

</template>

<script>
import {mapState, mapActions} from 'vuex'
import TableCartRow from '@/components/table/TableCartRow'
export default  {
  name: 'cart',
  data() {
    return {
      phones: []
    }
  },
  components: {
    TableCartRow
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
      const raw_purchases = this.lodash.map(this.cart, ({phone_id, amount}) => {
        const phone = this.lodash.find(this.phones, {id: phone_id})

        if(phone) {
          return {
            price: phone.price,
            name: phone.name,
            image_url: phone.image_url,
            id: phone_id,
            amount
          }
        }
        return null
      })
      return this.lodash.filter(raw_purchases)
    }
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