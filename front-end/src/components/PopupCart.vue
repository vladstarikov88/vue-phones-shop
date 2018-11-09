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
import Popup from '@/components/Popup'
  export default  {
    name: 'popup-cart',
    props: [],
    components: {
      Popup
    }
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {
      ...mapState('')
    }
}
</script>

<style scoped lang="scss">
</style>
