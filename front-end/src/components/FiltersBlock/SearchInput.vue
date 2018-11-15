<template lang="html">

 <p class="control has-icons-left">
    <input 
      class="input is-normal" 
      type="text"
      v-bind="$attrs"
      v-on="listeners"
      >
    <span class="icon is-normal is-left">
      <i class="fas fa-search" aria-hidden="true"></i>
    </span>
  </p>

</template>

<script lang="js">
  export default  {
    name: 'search-input',
    inheritAttrs: false,
    computed: {
      listeners() {
        return {
          ...this.$listeners,
          input: ({target}) => this.$emit('input', target.value),
        }
      }
    }
}
</script>

<style scoped lang="scss">
  .search-input {

  }
</style>
