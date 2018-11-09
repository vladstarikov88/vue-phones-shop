<template>
  <div class="modal" :class="{ 'is-active': isOpen}">
    <div class="modal-background" @click.self="close"></div>
    <div class="modal-content">
      <div class="box">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "ModalWindow",
  props: ["isOpen"],
  store,
  computed: {
    ...mapGetters('cart', ['countAmount'])
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
