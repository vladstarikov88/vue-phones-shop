<template>
  <div class="popup box">
    <table v-if="purchases && purchases.length" class="table is-fullwidth">
      <thead>
      <tr>
        <th>Миниатюра</th>
        <th>Модель</th>
        <th>Количество</th>
        <th>Стоимость</th>
        <th>Убрать</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="purchase in purchases">
        <tr :key="purchase.id">
          <td>
            <figure class="image is-64x64"><img :src="purchase.image_url" alt=""></figure>
          </td>
          <td>{{purchase.name}}</td>
          <td>x {{purchase.amount}} шт.</td>
          <td>{{purchase.price * purchase.amount}} руб.</td>
          <td class="is-center">
            <a class="button is-danger" @click="removeFromCartById(purchase.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </a>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
    <h1 class="title is-centered" v-else>
      В корзину пока ни чего не добавленно
    </h1>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  export default  {
    name: 'popup-cart',
    props: [],
    mounted() {

    },
    data() {
      return {
        phones: []
      }
    },
    methods: {
      ...mapActions('cart',['removeFromCartById']),
      fetchPhones() {
        const promises = this.lodash.map(this.cart, ({phone_id})=>
          this.axios.get('/phone', {id: phone_id}).then(({data})=> data)
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

<style scoped lang="scss">
.table { 
  th, td{
    text-align: center;
  }
  tr td {
    vertical-align: middle!important;
    img {
      max-height: unset;
    }
  }
}
</style>
