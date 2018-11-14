<template>
  <div class="filters-block">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="field has-addons">
            <dropdown
              :options="options"
              v-model="query.category_name">
            </dropdown>
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
  import Dropdown from './Dropdown.vue'
  export default  {
    name: 'filters-block',
    props: [],
    components: {
      SearchInput,
      Dropdown,
    },
    data() {
      return {
        options: [
          {
            value: '',
            title: 'Все',
          },
          {
            value: 'IPhone',
            title: 'IPhone',
          },
          {
            value: 'Нормальный телефон',
            title: 'Нормальный телефон',
          }
        ],
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
