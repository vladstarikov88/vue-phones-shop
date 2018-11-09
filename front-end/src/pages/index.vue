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
      :is-open="is_open"
      :key="current_phone.id"
      v-on:close="closeModal()"
      :phone="current_phone">
    </modal-add-to-cart>
    <div>
      <div>{{cart}}</div>
      <div>Кол-во: {{ countAmount }}</div>
      <div>Итог: {{ getTotalPrice }}</div>
      <div>{{ wishlist }}</div>
      <!-- <div>Товаров в корзине: {{ getTotalFromWishlist }}</div> -->
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
      is_open: false,
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
    ...mapGetters('cart', ['countAmount', 'getTotalPrice']),
    ...mapState('wishlist', ['wishlist'])
  },
  asyncComputed: {
  
  },
  methods: {
    ...mapActions('cart', ['addToCartById']),
    ...mapActions('wishlist', ['toggleToWishlistById']),

    openModal(phone) {
      this.is_open = !this.is_open
      this.current_phone = phone;
    },
    closeModal() {
      this.is_open = !this.is_open
    },
    hasInWishList(phone_id) {
      return !!this.lodash.find(this.wishlist, {phone_id})
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
