<template>
  <tr>
    <td>
      <figure class="image is-64x64"><img :src="wish.image_url" alt=""></figure>
    </td>
    <td>{{wish.name}}</td>
    <td>{{wish.price}} руб.</td>
    <td>{{wish.date}}</td>
    <td class="is-center">
      <div class="buttons">
        <a
          @click="$emit('open-modal', wish)"
          class="button is-info">
            <span class="icon">
                <i class="fas fa-cart-arrow-down"></i>
            </span>
          <span>Добавить в корзину</span>
        </a>
        <a
          @click="toggleToWishlistById(wish.id)"
          class="button is-danger">
            <span class="icon is-small">
                <i :class="[ hasInWishList(wish.id) ? 'fas': 'far']" class="fa-trash"></i>
            </span>
        </a>
      </div>
    </td>
  </tr>
</template>

<script>
  import {mapState, mapActions} from "vuex";

  export default {
    props: ["wish"],
    data() {
      return {};
    },
    computed: {
      ...mapState("wishlist", ["wishlist"])
    },
    methods: {
      ...mapActions("wishlist", ["toggleToWishlistById"]),
      ...mapActions("cart", ["addToCartById"]),
      hasInWishList(purchase_id) {
        return !!this.lodash.find(this.wishlist, {phone_id: purchase_id});
      }
    }
  };
</script>

<style>
</style>
