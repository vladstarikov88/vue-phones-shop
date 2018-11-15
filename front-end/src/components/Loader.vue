<template lang="html">

  <section class="loader-block">
    
    <div class="paper_man_wrapper">
      <div class="paper_man">
        <div class="paper_man_body part">
          <div class="paper_man_head part"></div>
          <div class="paper_man_arm left">
            <div class="paper_man_arm_1 part">
              <div class="paper_man_arm_2 part">
                <div class="paper_man_arm_hand part"></div>
              </div>
            </div>
          </div>
          <div class="paper_man_arm right">
            <div class="paper_man_arm_1 part">
              <div class="paper_man_arm_2 part">
                <div class="paper_man_arm_hand part"></div>
              </div>
            </div>
          </div>
          <div class="paper_man_leg left">
            <div class="paper_man_leg_1 part">
              <div class="paper_man_leg_2 part">
                <div class="paper_man_leg_foot part"></div>
              </div>
            </div>
          </div>
          <div class="paper_man_leg right">
            <div class="paper_man_leg_1 part">
              <div class="paper_man_leg_2 part">
                <div class="paper_man_leg_foot part"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'loader',
    props: [],
    mounted() {

    },
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
.loader-block {
  background: #fff;
  height: 70vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 500px;
}
div {
  position: absolute;
  transform-style: preserve-3d;
}

.paper_man_wrapper {
  animation: cameraY 7000ms linear infinite;
}
.paper_man {
  top: -100px;
  left: -50px;
  animation: cameraX 5000ms ease-in-out infinite alternate;
  .part {
    background: rgba(0, 0, 0, 1);
    backface-visibility: hidden;
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(100, 100, 100, 1);
      transform: rotateY(180deg);
      backface-visibility: hidden;
    }
  }
  &_body {
    transform-origin: 50% 100%;
    transform: rotateX(-20deg);
    width: 60px;
    height: 100px;
    animation: shake4 2000ms -100ms ease-in-out infinite;
  }
  &_head {
    transform-origin: 50% 100%;
    top: -40px;
    left: calc(50% - 20px);
    width: 40px;
    height: 40px;
    transform: rotateX(-10deg);
    animation: shake4 1000ms -800ms ease-in-out infinite;
  }
  &_arm {
    &.left {
      transform-origin: 0 0;
      right: 0px;
      animation: shake1 1000ms -400ms ease-in-out infinite;
    }
    &.right {
      transform-origin: 100% 0;
      left: -20px;
      animation: shake1 1000ms -900ms ease-in-out infinite;
    }
    &_1 {
      transform-origin: 50% 0;
      width: 20px;
      height: 50px;
    }
    &_2 {
      transform-origin: 50% 0;
      bottom: -50px;
      width: 20px;
      height: 50px;
      .left & {
        animation: shake3 1000ms -800ms ease-in-out infinite;
      }
      .right & {
        animation: shake3 1000ms -300ms ease-in-out infinite;
      }
    }
    &_hand {
      transform-origin: 50% 0;
      bottom: -15px;
      width: 20px;
      height: 15px;
      .left & {
        animation: shake3 1000ms -200ms ease-in-out infinite;
      }
      .right & {
        animation: shake3 1000ms -700ms ease-in-out infinite;
      }
    }
  }
  &_leg {
    transform-origin: 50% 0;
    top: 100px;
    &.left {
      right: 30px;
      animation: shake1 1000ms ease-in-out infinite;
    }
    &.right {
      left: 0;
      animation: shake1 1000ms -500ms ease-in-out infinite;
    }
    &_1 {
      transform-origin: 50% 0;
      width: 30px;
      height: 50px;
    }
    &_2 {
      transform-origin: 50% 0;
      bottom: -40px;
      width: 30px;
      height: 40px;
      .left & {
        animation: shake2 1000ms -600ms ease-in-out infinite;
      }
      .right & {
        animation: shake2 1000ms -100ms ease-in-out infinite;
      }
    }
    &_foot {
      transform-origin: 50% 0;
      bottom: -20px;
      width: 30px;
      height: 20px;
      .left & {
        animation: shake3 1000ms -400ms ease-in-out infinite;
      }
      .right & {
        animation: shake3 1000ms -900ms ease-in-out infinite;
      }
    }
  }
}

@keyframes shake1 {
  0% {
    transform: rotateX(80deg);
  }
  50% {
    transform: rotateX(-80deg);
  }
  100% {
    transform: rotateX(80deg);
  }
}

@keyframes shake2 {
  0% {
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(-100deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}

@keyframes shake3 {
  0% {
    transform: rotateX(10deg);
  }
  50% {
    transform: rotateX(120deg);
  }
  100% {
    transform: rotateX(10deg);
  }
}

@keyframes shake4 {
  0% {
    transform: rotateX(-30deg);
  }
  50% {
    transform: rotateX(-10deg);
  }
  100% {
    transform: rotateX(-30deg);
  }
}

@keyframes cameraY {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

@keyframes cameraX {
  0% {
    transform: rotateX(-50deg);
  }
  100% {
    transform: rotateX(50deg);
  }
}
</style>
