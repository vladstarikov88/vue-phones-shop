<template lang="html">
  <div class="modal" :class="{ 'is-active': is_open }">
    <div class="modal-background" @click.self="close"></div>
    <div class="modal-content">
      <p class="image is-4by3">
        <img :src="src" :alt="alt">
      </p>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="close"></button>
  </div>
</template>

<script lang="js">
  import bus from './bus'
  export default  {
    name: 'zoom-image',
    mounted() {
      bus.$on('zoom-image', this.zoomImage)
    },
    beforeDestroy(){
       this.bus.$off('zoom-image', this.zoomImage)
    },
    data() {
      return {
        src: '',
        alt: '',
        is_open: false,
      }
    },
    methods: {
      zoomImage({src, alt}) {
        this.is_open = true;
        this.alt = alt;
        this.src = src;
      },
      close() {
        this.is_open = false;
      }
    },
}
</script>

<style scoped lang="scss">

</style>
