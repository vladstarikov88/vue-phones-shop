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
          <div class="buttons">
            <a class="button" @click="toggleModal()">
              <span class="icon">
                <i class="fas fa-sign-in-alt"></i>
              </span>
            </a>
            <a class="button is-white">
              <router-link to="/cart" tag="span" class="icon">
                <i class="fas fa-shopping-cart "></i>
              </router-link>
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
            <p class="is-marginless">Общая стоймость: {{promiseTotalPrice}} руб.</p>
            <p class="is-marginless">Общее кол-во телефонов: {{getTotalAmountPhones}} шт.</p>
          </div>
        </div>
      </div>
    </div>
    <modal-login-form
      :is-open="modal_is_open"
      v-on:close="toggleModal()">
    </modal-login-form>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex';
import ModalLoginForm from '@/components/ModalLoginForm'

export default {
  data() {
    return {
      modal_is_open: false
    }
  },
  components: {
    ModalLoginForm
  },
  computed: {
    ...mapGetters('cart', ['getTotalAmountPhones']),
    ...mapGetters('user', ['getAccessTocken'])
  },
  asyncComputed: {
    ...mapGetters('cart', ['promiseTotalPrice'])
  },
  methods: {
    toggleModal() {
      this.modal_is_open = !this.modal_is_open;
    }
  }
};
</script>
