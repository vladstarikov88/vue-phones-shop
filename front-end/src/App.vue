<template>
  <div>
    <nav-bar></nav-bar>
    <!-- <transition name="slide-fade" mode="out-in"> -->
      <router-view></router-view>
    <!-- </transition> -->
    <notifications></notifications>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  name: 'app',
  components: {
    NavBar
  },
}
</script>

<style lang='scss'>

</style>
