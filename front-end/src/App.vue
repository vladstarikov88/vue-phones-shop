<template>
  <div>
    <nav-bar></nav-bar>
    <router-view></router-view>
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
