<template>
   <section class="section">
    <div class="columns is-multiline">
      <template v-if="phones && phones.length" v-for="phone in phones">
        <div class="column is-4-tablet" :key="phone.id">
          <phone-card :phone="phone">
          </phone-card>
        </div>
      </template>
    </div>
    <div>
      <button @click="addToCartById([1, 2])">add</button>
      <div>{{cart}}</div>
      <div>Кол-во: {{ countAmount }}</div>
      <div>Итог: {{ getTotalPrice }}</div>
    </div>
  </section>

</template>
<script>
import axios from "axios";
import { mapActions, mapState, mapGetters } from 'vuex';
import PhoneCard from '@/components/PhoneCard'
export default {
  data() {
    return {
      phones: []
    }
  },
  created() {
    axios
      .get("/phones")
      .then((response) => {
        this.phones = response.data.phones
      });
    
  },
  components: {
    PhoneCard,
  },
  computed: {
    ...mapState('cart', ['cart']),
    ...mapGetters('cart', ['countAmount', ])
  },
  asyncComputed: {
    ...mapGetters('cart', ['getTotalPrice'])
  },
  data() {
    return {
      phones: []
    }
  },
  methods: {
    ...mapActions('cart', ['addToCartById'])
  },
};
</script>
<style lang="scss" scoped>
</style>
