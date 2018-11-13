<template>

  <section class="notifications">
      <transition-group
        name="list"
        >
      <template v-if="$notifications.length" v-for="(notification, index) in $notifications">
        <div :key="index" class="notification is-primary" :class="[`is-${notification.status}`]">
          <button class="delete"></button>
          {{notification.message}}
        </div>
      </template>
      </transition-group>
      
    
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
  .list-enter-active, .list-leave-active {
    transition: opacity 1s ease-out, transform 1s ease-out;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .notifications {
    position: fixed;
    top: 3vh;
    right: 3vw;
  }
</style>
