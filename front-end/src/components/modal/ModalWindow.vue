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
export default {
  name: "ModalWindow",
  methods: {
    close() {
      this.$emit('close')
    }
  },
};
</script>

<style scoped lang="scss">
</style>
