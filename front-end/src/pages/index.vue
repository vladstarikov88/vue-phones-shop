<template>
  <div>
    <div>
      <ul>
        <li v-for="item in phonesList" :key="item.id">
          {{ item.id }}. {{ item.name }} - {{ item.price }}
        </li>
      </ul>
    </div>
    <div>
      <button @click="addToCartById([1, 2])">add</button>
      <div>{{cart}}</div>
      <div>Кол-во: {{ countAmount }}</div>
      <div>Итог: {{ getTotalPrice }}</div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      phonesList: []
    }
  },
  created() {
    axios
      .get("/phones")
      .then( response => {
        this.phonesList = response.data.phones;
      });
    axios
      .get("/phone", { id: 2 })
      .then(function(response) {
        //console.log(response.data);
      });
    
  },
  computed: {
    ...mapState('cart', ['cart']),
    ...mapGetters('cart', ['countAmount', ])
  },
  asyncComputed: {
    ...mapGetters('cart', ['getTotalPrice'])
  },
  methods: {
    ...mapActions('cart', ['addToCartById'])
  },
};
</script>
<style lang="scss" scoped>
</style>
