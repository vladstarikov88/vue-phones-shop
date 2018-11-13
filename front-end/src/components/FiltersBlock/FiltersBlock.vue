<template>

  <div class="filters-block">
    <div class="level">
      <div class="field has-addons">
        <p class="control">
          <span class="select" >
            <select @change="changeCategory($event.target.value)">
              <option value="" disabled>Категория</option>
              <option value="IPhone">IPhone</option>
              <option value="Норомальный телефон">Нормальные телефоны</option>
            </select>
          </span>
        </p>
        <search-input @search="search"></search-input>
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
    mounted() {

    },
    data() {
      return {
        search_text: '',
        category_name: '',
      }
    },
    methods: {
      changeCategory(category_name) {
        this.category_name = category_name;
        this.setFilter()
      },
      search(search_text) {
        this.search_text = search_text;
        this.setFilter();
      },
      setFilter() {
        this.$emit('set-filters', {
          search_text: this.search_text,
          category_name: this.category_name,
        })
      }
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
.filters-block {
}
</style>
