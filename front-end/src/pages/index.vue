<template>
   <section class="section">
    <div class="columns is-multiline">
      <template v-if="phones && phones.length" v-for="phone in phones">
        <div class="column is-4-tablet" :key="phone.id">
          <phone-card 
            :phone="phone"
            v-on:open-modal="openModal(phone)">
          </phone-card>
        </div>
      </template>
    </div>
    <modal-add-to-cart
      :is-open="is_open"
      v-on:close="closeModal()"
      :phone="current_phone">

    </modal-add-to-cart>
    <div>
      <div>{{cart}}</div>
      <div>Кол-во: {{ countAmount }}</div>
      <div>Итог: {{ getTotalPrice }}</div>
    </div>
  </section>

</template>
<script>

import { mapActions, mapState, mapGetters } from 'vuex';
import PhoneCard from '@/components/PhoneCard'
import ModalAddToCart from '@/components/ModalAddToCart'
export default {
  data() {
    return {
      phones: [],
      current_phone: {},
      is_open: false
    }
  },
  created() {
    this.axios
      .get("/phones")
      .then((response) => {
        this.phones = response.data.phones
      });
    
  },
  components: {
    PhoneCard,
    ModalAddToCart    
  },
  computed: {
    ...mapState('cart', ['cart']),
    ...mapGetters('cart', ['countAmount','getTotalPrice']),
  },
  asyncComputed: {
  
  },
  methods: {
    ...mapActions('cart', ['addToCartById']),

    openModal(phone) {
      this.is_open = !this.is_open
      this.current_phone = phone;
      console.log(this.current_phone)
    },
    closeModal() {
      this.is_open = !this.is_open
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
