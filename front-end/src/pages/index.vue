<template>
    
</template>
<script>
import axios from 'axios'

export default {
  created() {
    axios.get(`${process.env.API_HOST}/example`).then(response => {
      let { collection1 } = response.body;
      console.log(collection1)
    });
  }
};
</script>
<style lang="scss" scoped>
</style>
