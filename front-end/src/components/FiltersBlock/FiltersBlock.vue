<template>
  <div class="filters-block">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <span class="select" >
                <select v-model="query.category_name">
                  <option value="">Все категории</option>
                  <option value="IPhone">IPhone</option>
                  <option value="Норомальный телефон">Нормальные телефоны</option>
                </select>
              </span>
            </p>
            <search-input 
              placeholder="Искать по каталогу"
              v-model="query.search_text">
            </search-input>
            <p class="control">
              <a class="button is-info">
                Поиск
              </a>
            </p>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox">
                Только в наличии
            </label>
          </div>
        </div>
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
