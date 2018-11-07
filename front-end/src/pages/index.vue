<template>
  <div>
    <button @click="addToCartById([0, 2])">add</button>
    {{cart}}
  </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapState } from 'vuex';

export default {
  created() {
    axios
      .get("/phones")
      .then(function(response) {
        console.log(response);
        
      });
    axios
      .get("/phone", { id: 2 })
      .then(function(response) {
        //console.log(response.data);
      });
  },
  computed: {
    ...mapState('cart', ['cart'])
  },
  methods: {
    ...mapActions('cart', ['addToCartById'])
  },
};
</script>
<style lang="scss" scoped>
</style>
