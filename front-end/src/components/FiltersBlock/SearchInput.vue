<template lang="html">

 <p class="control has-icons-left">
    <input 
      class="input is-normal" 
      type="text" 
      placeholder="search" 
      v-bind="$attrs"
      :value="value"
      @input="$emit('input')"
      >
    <span class="icon is-normal is-left">
      <i class="fas fa-search" aria-hidden="true"></i>
    </span>
  </p>

</template>

<script lang="js">
  export default  {
    name: 'search-input',
    props: ['value'],
    inheritAttrs: false,
}
</script>

<style scoped lang="scss">
  .search-input {

  }
</style>
