<template lang="html">

 <p class="control has-icons-left">
    <input class="input is-normal" type="text" placeholder="search" @input="search">
    <span class="icon is-normal is-left">
      <i class="fas fa-search" aria-hidden="true"></i>
    </span>
  </p>

</template>

<script lang="js">
  export default  {
    name: 'search-input',
    props: [],
    created() {
      
    },
    data() {
      return {

      }
    },
    methods: {
      search(event) {
        this.$emit('search', event.target.value);
      }
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  .search-input {

  }
</style>
