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
export default {
  name: "ModalWindow",
  props: ["isOpen"],
  methods: {
      close() {
          this.$emit('close')
      }
  },
};
</script>

<style scoped lang="scss">
</style>
