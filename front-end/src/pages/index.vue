<template>
   <section class="section">
    <div class="columns is-multiline">
      <template v-if="phones && phones.length" v-for="phone in phones">
        <div class="column is-4-tablet" :key="phone.id">
          <phone-card 
            :phone="phone"
            :has-in-wish-list="hasInWishList(phone.id)"
            v-on:open-modal="openModal(phone)"
            v-on:toggle-favorite="toggleToWishlistById(phone.id)">
          </phone-card>
        </div>
      </template>
    </div>
      <modal-add-to-cart
        v-if="modal_is_open"
        v-on:close="closeModal()"
        :key="current_phone.id"
        :phone="current_phone">
      </modal-add-to-cart>
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
      modal_is_open: false,
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
    ...mapState('wishlist', ['wishlist'])
  },
  asyncComputed: {
    ...mapGetters('cart', ['promiseTotalPrice'])
  
  },
  methods: {
    ...mapActions('wishlist', ['toggleToWishlistById']),

    openModal(phone) {
      this.modal_is_open = !this.modal_is_open
      this.current_phone = phone;
    },
    closeModal() {
      this.modal_is_open = !this.modal_is_open
    },
    hasInWishList(phone_id) {
      return !!this.lodash.find(this.wishlist, {phone_id})
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
