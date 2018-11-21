<template lang="html">

  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Миниатюра</th>
        <th>Модель</th>
        <th>Количество</th>
        <th>Стоимость</th>
        <th>Редактировать</th>
        <th>Отметить</th>
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

</template>

<script lang="js">
  import TableCartRow from './TableCartRow'
  export default  {
    name: 'table-cart',
    props: ['purchases'],
    components: {
      TableCartRow
    },
}
</script>

<style scoped lang="scss">
  .table-cart {

  }
</style>
