<template>
   <section class="section">
    <div class="columns is-multiline">
      <template v-if="phones && phones.length" v-for="phone in phones">
        <div class="column is-4-tablet" :key="phone.id">
          <phone-card 
            :phone="phone"
            v-on:open-modal="openModal(phone.id)">
          </phone-card>
        </div>
      </template>
    </div>
    <modal-window
      :is-open="modal_is_open"
      @close="closeModal">
      <p>dadas</p>
    </modal-window>
    <div>
      <button @click="addToCartById([1, 2])">add</button>
      <div>{{cart}}</div>
      <div>Кол-во: {{ countAmount }}</div>
      <div>Итог: {{ getTotalPrice }}</div>
    </div>
  </section>

</template>
<script>

import { mapActions, mapState, mapGetters } from 'vuex';
import PhoneCard from '@/components/PhoneCard'
import ModalWindow from '@/components/ModalWindow'
export default {
  data() {
    return {
      phones: [],
      modal_is_open: false
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
    ModalWindow
    
  },
  computed: {
    ...mapState('cart', ['cart']),
    ...mapGetters('cart', ['countAmount', ])
  },
  asyncComputed: {
    ...mapGetters('cart', ['getTotalPrice'])
  },
  methods: {
    ...mapActions('cart', ['addToCartById']),
    openModal(phoneId) {
      this.modal_is_open = true;
    },
    closeModal() {
      this.modal_is_open = false;
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
