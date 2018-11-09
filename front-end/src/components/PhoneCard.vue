<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img v-if="phone.image_url" :src="phone.image_url" alt="Изображение телефона">
        <img v-else src="https://via.placeholder.com/150" alt="Placeholder">
      </figure>
    </div>
    <div class="card-content">
      <p class="title is-4 is-center">{{phone.name}}</p>
      <p class="title is-4 is-center">{{phone.price}} руб.</p>
      <p class="title is-6" v-if="phone.is_available">
        есть в наличии
      </p>
      <p class="title is-6" v-else>
        нет в наличии
      </p>
      <div class="buttons">
        <button class="button is-success" :disabled="!phone.is_available" @click="$emit('open-modal', phone)">
          Добавить в корзину
        </button>
        <button class="button is-info" @click="$emit('toggle-favorite', phone)">
        <!-- <button class="button is-info" @click="toggleToWishlistById(phone.id)"> -->
          <span class="icon">
            <i class="fa-star" :class="[ hasInWishList ? 'fas': 'far']"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
  export default {
    name: "PhoneCard",
    props: ['phone', 'hasInWishList'],
    methods: {
      ...mapActions('wishlist', ['addToWishlistById', 'toggleToWishlistById']),
    }
  }
</script>

<style scoped lang="scss">

</style>
