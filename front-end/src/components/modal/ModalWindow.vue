<template>
  <transition name="fade">
  <div class="modal is-active">
    <div class="modal-background" @click.self="close"></div>
    <div class="modal-content">
      <div class="box">
        <slot></slot>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import store from '@/store'
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "ModalWindow",
  store,
  computed: {
    ...mapGetters('cart', ['getTotalAmountPhones'])
  },
  methods: {
    ...mapActions('cart', ['addToCartById']),

    close() {
      this.$emit('close')
    }
  },
};
</script>

<style scoped lang="scss">
</style>
