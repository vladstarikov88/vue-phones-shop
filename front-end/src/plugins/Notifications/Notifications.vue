<template>

  <section class="notifications">
    <template v-if="$notifications.length" v-for="(notification, index) in $notifications">
      <span :key="index">
        {{notification.message}}
      </span>
    </template>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'notifications',
    props: [],
    data() {
      return {
      }
    },
    methods: {
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  .notifications {

  }
</style>
