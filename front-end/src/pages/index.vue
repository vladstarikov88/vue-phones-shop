<template>
<main>
    <section class="section is-small">
      <div class="container">
        <filters-block @set-filters="wrappedFetchData"></filters-block>
      </div>
    </section>
   <section class="section is-small">
     <div class="container">
      <transition name="fade">
        <div v-show="!loading" class="columns is-multiline">
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
          <template v-if="!phones.length">
            <h1 class="title">По вашему запросу ничего не найдено</h1>
          </template>
        </div>
      </transition>
      <loader v-show="loading"></loader>
    </div>
    <modal-add-to-cart
      v-if="modal_is_open"
      v-on:close="closeModal()"
      :key="current_phone.id"
      :phone="current_phone"
      :has-in-wish-list="hasInWishList(current_phone.id)"
      @add-to-cart="addToCart">
    </modal-add-to-cart>
  </section>
</main>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import PhoneCard from '@/components/PhoneCard';
import ModalAddToCart from '@/components/modal/ModalAddToCart';
import FiltersBlock from '@/components/FiltersBlock';
import Loader from '@/components/Loader';


export default {
  data() {
    return {
      loading: false,
      phones: [],
      current_phone: {},
      modal_is_open: false,
    }
  },
  created() {
    this.fetchData(); 
    this.debounceFetchData = this.lodash.debounce(this.fetchData, 1000);
    this.wrappedFetchData = this.lodash.wrap(this.debounceFetchData, (func, query) => {
      this.loading = true;
      func(query);
    })
  },
  components: {
    Loader,
    FiltersBlock,
    PhoneCard,
    ModalAddToCart, 
  },

  computed: {
    ...mapState('wishlist', ['wishlist'])
  },
  asyncComputed: {
    ...mapGetters('cart', ['promiseTotalPrice'])
  
  },
  methods: {
    ...mapActions('wishlist', ['toggleToWishlistById']),
    ...mapActions("cart", ["addToCartById"]),
    fetchData(query) {
      this.loading = true;
      this.axios
        .get("/phones", {query})
        .then((response) => {
          this.phones = response.data.phones
        })
        .finally(()=>{
          this.loading = false;
        });
    },
    openModal(phone) {
      this.modal_is_open = !this.modal_is_open
      this.current_phone = phone;
    },
    closeModal() {
      this.modal_is_open = !this.modal_is_open
    },

    hasInWishList(phone_id) {
      return !!this.lodash.find(this.wishlist, {phone_id})
    },
    addToCart(id, current_amount) {
      this.addToCartById([id, current_amount]);
      this.$notify({
        message: "Товар был успешно добавлен в корзину.",
        status: "info"
      });
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
