<template lang="html">

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
        <template v-for="purchase in purchases">
          <tr :key="purchase.id">
            <td>
              <figure class="image is-64x64"><img :src="purchase.image_url" alt=""></figure>
            </td>
            <td>x {{purchase.amount}} шт.</td>
            <td>{{purchase.amount}}</td>
            <td>{{purchase.price * purchase.amount}} руб.</td>
            <td class="is-center">
              <div class="buttons">
                <a class="button is-danger" @click="removeFromCartById(purchase.id)">
                  <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                  </span>
                </a>
                <a 
                  class="button is-info"
                  @click="toggleToWishlistById(purchase.id)">
                  <span class="icon is-small">
                    <i class="fa-star" :class="[ hasInWishList(purchase.id) ? 'fas': 'far']"></i>
                  </span>
                </a>
                <button class="button">Редактировать</button>
              </div>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
      <button 
        class=button
        @click="">Перейти к оформлению покупки</button>  
    </div>
    <p class="title is-5" v-else>В корзину пока ни чего не добавленно</p>
  </section>

</template>

<script lang="js">
import {mapState, mapActions} from 'vuex'
export default  {
  name: 'cart',
  data() {
    return {
      phones: []
    }
  },
  methods: {
    ...mapActions('cart',['removeFromCartById']),
    ...mapActions('wishlist', ['toggleToWishlistById']),
    fetchPhones() {
      const promises = this.lodash.map(this.cart, ({phone_id}) =>
        this.axios.get('/phone', {id: phone_id})
          .then(({data}) => data)
      );
      Promise.all(promises).then( data => {
        this.phones = data
      })
    },
    hasInWishList(phone_id) {
      return !!this.lodash.find(this.wishlist, {phone_id})
    }
  },
  computed: {
    ...mapState('cart', ['cart']),
    ...mapState('wishlist', ['wishlist']),
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

<style scoped lang="scss">
  .input{
    width: 3em;
  }
</style>
