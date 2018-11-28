<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="image_url" alt="" v-zoomable-image="{
          src: image_url,
          alt: phone.name,
        }">
      </figure>
    </div>
    <div class="card-content">
      <p class="title is-4 is-center">{{phone.name}}</p>
      <p class="title is-4 is-center">{{phone.price}} руб.</p>
      <p class="title is-6" v-if="phone.is_available">
        <span>есть в наличии</span>
        <span>({{phone.quantity}})</span>
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
import {storage} from '@/plugins/FirebasePlugin.js'
export default {
  name: "PhoneCard",
  props: ["phone", "hasInWishList"],
  data() {
    return {
      image_url: null
    }
  },
  // computed: {
  //   src() {
  //     if(this.phone.img) {
  //       storage.ref().child(this.phone.img).getDownloadURL()
  //       .then(url => this.image_url = url)
  //     } else {
  //       return "https://via.placeholder.com/150";
  //     }
  //   }
  // },
  watch: {
    phone: {
      deep: true,
      handler() {
          this.fetchImg()
      },
      immediate: true,
    }
  },
  methods: {
    ...mapActions("wishlist", ["addToWishlistById", "toggleToWishlistById"]),
    fetchImg() {
      if(this.phone.img) {
        storage.ref().child(this.phone.img).getDownloadURL()
        .then(url => this.image_url = url)
      } else {
        return "https://via.placeholder.com/150";
      }
    }
  },
};
</script>

<style scoped lang="scss">
</style>
