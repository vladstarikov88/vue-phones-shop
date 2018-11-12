<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
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
      </div>
      <div class="navbar-end">
        <div class="navbar-item" style="position: relative">
          <popup-cart v-show="popup_cart_is_open"></popup-cart>
          <div class="buttons">
<<<<<<< HEAD
            <a class="button" @click="toggleModal">
=======

            <a class="button" @click="checkAuth()">
              Проверка на авторизацию
            </a>

            <!-- Выйти из системы -->
            <a 
              class="button" 
              @click="clearAcessTocken()"
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
>>>>>>> login
              <span class="icon">
                <i class="fas fa-sign-in-alt"></i>
              </span>
            </a>
<<<<<<< HEAD
            <a class="button is-white popup-toggle" @click="togglePopupCart">
              <span class="icon">
=======
            <!--  -->
            
            <a class="button is-white">
              <router-link to="/cart" tag="span" class="icon">
>>>>>>> login
                <i class="fas fa-shopping-cart "></i>
              </span>
            </a>
            <a class="button is-white popup-toggle">
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
<<<<<<< HEAD
import { mapGetters } from 'vuex';
import PopupCart from '@/components/PopupCart';
=======
import { mapGetters, mapActions } from 'vuex';
>>>>>>> login
import ModalLoginForm from '@/components/ModalLoginForm'

export default {
  data() {
    return {
<<<<<<< HEAD
      modal_is_open: false,
      popup_cart_is_open: false,
=======
      modal_form_is_open: false
>>>>>>> login
    }
  },
  components: {
    PopupCart,
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
<<<<<<< HEAD
    togglePopupCart() {
      this.popup_cart_is_open = !this.popup_cart_is_open;
    },
=======
    ...mapActions('user', ['clearAcessTocken']),
>>>>>>> login
    toggleModal() {
      this.modal_form_is_open = !this.modal_form_is_open;
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
