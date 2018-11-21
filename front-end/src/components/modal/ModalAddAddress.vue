<template>
  <modal-window v-on:close="close">
    <h4 class="title is-4 has-text-centered">Добавить новый адрес</h4>
    <div class="form">
      <div class="field">
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Имя"
            v-model="username">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Адрес доставки"
            v-model="address">
        </div>
      </div>
      <div class="field">
        <div class="control has-icons-right">
          <input
            class="input"
            type="email"
            placeholder="Email"
            v-model="email">
          <span class="icon is-small is-right">
              <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button
            class="button is-link"
            @click="addNewAddress">Добавить
          </button>
        </div>
      </div>
    </div>
  </modal-window>
</template>

<script>
  import ModalWindow from "./ModalWindow";

  export default {
    data() {
      return {
        address: null,
        username: null,
        email: null
      }
    },
    components: {
      ModalWindow
    },
    methods: {
      close() {
        this.$emit('close')
      },
      addNewAddress() {
        this.$emit('add-address', {
          address: this.address,
          username: this.username,
          email: this.email
        });
        this.$emit('close')
      }
    }
  }
</script>

<style>

</style>
