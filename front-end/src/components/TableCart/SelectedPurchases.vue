<template>
  <table class="table is-fullwidth">
    <tr>
      <th>Миниатюра</th>
      <th>Модель</th>
      <th>Колличество</th>
      <th>Стоимость</th>
    </tr>
    <tr :key="purchase.id" v-for="purchase in purchases">
      <td>
        <figure class="image is-64x64"><img :src="purchase.image_url" alt=""></figure>
      </td>
      <td>{{purchase.name}}</td>
      <td>x {{purchase.amount}} шт.</td>
      <td>{{purchase.amount * purchase.price}} руб.</td>
    </tr>
  </table>
</template>

<script>
  export default {
    props: ['purchases']
  }
</script>