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
                    class="button is-success" 
                    @click="$emit('open-modal', wish)">
                    Добавить в корзину
                </a>
                <a 
                    class="button is-danger"
                    @click="toggleToWishlistById(wish.id)">
                    <span class="icon is-small">
                        <i class="fa-trash" :class="[ hasInWishList(wish.id) ? 'fas': 'far']"></i>
                    </span>
                </a>    
            </div>
        </td>
    </tr>
</template>

<script>
import { mapState, mapActions } from "vuex";

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
      return !!this.lodash.find(this.wishlist, { phone_id: purchase_id });
    }
  }
};
</script>

<style>
</style>
