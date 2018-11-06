<template>
    
</template>
<script>
import axios from 'axios'

export default {
  created() {
axios.get('/users', { params: { searchText: 'John' } } )
  .then(function(response) {
    console.log(response.data);
  });
    }
};
</script>
<style lang="scss" scoped>
</style>
