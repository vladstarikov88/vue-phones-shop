<template>
  <div class="popup">
<table v-if="purchases.length" class="table is-fullwidth">
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
          <td>{{purchase.amount}}</td>
          <td>{{purchase.price * purchase.amount}}</td>
          <td class="is-center">
            <nuxt-link to="/purchases">К списку желаний</nuxt-link>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script lang="js">
  import {mapState} from 'vuex';
  export default  {
    name: 'popup-cart',
    props: [],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {
      ...mapState('cart', ['cart'])
    },
    asyncComputed: {
      async purchases() {
        return await Promise.all(this.lodash.map(this.cart, ({phone_id, amount})=>{
          return this.axios.get('/phone', {id: phone_id}).then(res=>({...res.data, amount}))
        }))
      }
    }
}
</script>

<style scoped lang="scss">
</style>
