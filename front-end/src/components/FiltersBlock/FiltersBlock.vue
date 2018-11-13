<template>

  <div class="filters-block">
    <div class="level">
      <div class="field has-addons">
        <p class="control">
          <span class="select" >
            <select v-model="query.category_name">
              <option value="" disabled>Категория</option>
              <option value="IPhone">IPhone</option>
              <option value="Норомальный телефон">Нормальные телефоны</option>
            </select>
          </span>
        </p>
        <search-input v-model="query.search_text"></search-input>
        <p class="control">
          <a class="button is-info">
            Поиск
          </a>
        </p>
      </div>
    </div>
  </div>

</template>

<script lang="js">
  import SearchInput from './SearchInput.vue'
  export default  {
    name: 'filters-block',
    props: [],
    components: {
      SearchInput
    },
    data() {
      return {
        query: {
          search_text: '',
          category_name: '',
        }
      }
    },
    methods: {
      setFilter() {
        this.$emit('set-filters', this.query)
      }
    },
    watch: {
      query: {
        handler: 'setFilter',
        deep: true,
      }
    },

}
</script>

<style scoped lang="scss">
.filters-block {
}
</style>
