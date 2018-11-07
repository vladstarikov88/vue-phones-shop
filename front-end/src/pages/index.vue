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
  </section>

</template>
<script>
import { mapActions, mapState } from 'vuex';
import PhoneCard from '@/components/PhoneCard'
import axios from 'axios';


export default {
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
    ...mapState('cart', ['cart'])
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
