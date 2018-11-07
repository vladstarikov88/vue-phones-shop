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
    console.log(this.$store)
    axios
      .get("/users", { params: { searchText: "John" } })
      .then(function(response) {
        console.log(response.data);
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
