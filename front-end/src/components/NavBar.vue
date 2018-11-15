<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <strong>МАГАЗИН</strong>
      </a>
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
         data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">
          Витрина
        </router-link>
        <router-link to="/cart" class="navbar-item">
          Корзина
        </router-link>
        <router-link to="/wishlist" class="navbar-item">
          Список желаний
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item" style="position: relative">
          <popup-cart 
            v-if="popup_cart_is_open" 
            v-click-outside="togglePopupCart"></popup-cart>
          <popup-wishlist
            v-if="popup_wishlist_is_open"
            v-click-outside="togglePopupWishlist"></popup-wishlist>
          <div class="buttons">
            <!-- Выйти из системы -->
            <a 
              class="button" 
              @click="logOut()"
              v-if="existsAccessTocken()">
              <span class="icon">
                <i class="fas fa-sign-out-alt"></i>
              </span>
            </a>  
            <!--  -->

            <!-- Войти в систему -->
            <a 
              class="button" 
              @click="toggleModal()"
              v-if="!existsAccessTocken()">
              <span class="icon">
                <i class="fas fa-sign-in-alt"></i>
              </span>
            </a>
            <a 
              class="button is-white popup-toggle" 
              :class="{'has-background-grey-lighter' : popup_cart_is_open }"
              @click="togglePopupCart()">
              <span class="icon">
                <i class="fas fa-shopping-cart "></i>
              </span>
            </a>
            <a 
              class="button is-white popup-toggle" 
              :class="{ 'has-background-grey-lighter' : popup_wishlist_is_open }"
              @click="togglePopupWishlist()">
              <span class="icon">
                <i class="far fa-star"></i>
              </span>
            </a>
          </div>
        </div>
        <div class="navbar-item">
          <div class="counters">
            <p class="is-marginless">Общая стоимость: {{promiseTotalPrice}} руб.</p>
            <p class="is-marginless">Общее кол-во телефонов: {{getTotalAmountPhones}} шт.</p>
          </div>
        </div>
      </div>
    </div>
    <modal-login-form
      v-on:close="toggleModal()"
      v-if="modal_form_is_open">
    </modal-login-form>
  </nav>
</template>
<script>
import PopupCart from '@/components/popup/PopupCart';
import PopupWishlist from '@/components/popup/PopupWishlist';
import { mapGetters, mapActions } from 'vuex';
import ModalLoginForm from '@/components/modal/ModalLoginForm'

export default {
  data() {
    return {
      popup_cart_is_open: false,
      popup_wishlist_is_open: false,
      modal_form_is_open: false
    }
  },
  components: {
    PopupCart,
    PopupWishlist,
    ModalLoginForm,
  },
  computed: {
    ...mapGetters('cart', ['getTotalAmountPhones']),
    ...mapGetters('user', ['getAccessTocken']),
  },
  asyncComputed: {
    ...mapGetters('cart', ['promiseTotalPrice'])
  },
  methods: {
    togglePopupCart() {
      this.popup_cart_is_open = !this.popup_cart_is_open;
    },
    togglePopupWishlist() {
      this.popup_wishlist_is_open = !this.popup_wishlist_is_open
    },
    closePopupCart() {
      this.popup_cart_is_open = false;
    },
    ...mapActions('user', ['clearAcessTocken']),
    toggleModal() {
      this.modal_form_is_open = !this.modal_form_is_open;
    },
    logOut() {
      this.clearAcessTocken();
      delete this.axios.defaults.headers.common['Authorization']
    },
    checkAuth() {
      this.axios
        .post("/check");
    },
    existsAccessTocken() {
      return this.getAccessTocken ? 
        true :
        false
    }
  }
};
</script>
<style lang="scss" scoped>
  span.login{
    margin: 1em;
  }
</style>
