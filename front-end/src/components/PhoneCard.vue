<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="src" alt="" v-zoomable-image="{
          src,
          alt: phone.name,
        }">
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
          <span class="icon">
            <i class="fa-star" :class="[ hasInWishList ? 'fas': 'far']"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "PhoneCard",
  props: ["phone", "hasInWishList"],
  methods: {
    ...mapActions("wishlist", ["addToWishlistById", "toggleToWishlistById"])
  },
  computed: {
    src() {
      return this.phone.image_url
        ? this.phone.image_url
        : "https://via.placeholder.com/150";
    }
  }
};
</script>

<style scoped lang="scss">
</style>
