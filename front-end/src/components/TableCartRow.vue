<template>
    <tr :key="purchase.id">
        <td>
            <figure class="image is-64x64"><img :src="purchase.image_url" alt=""></figure>
        </td>
        <td>{{purchase.name}}</td>
        <td class="amount">
            <span v-if="is_editing">
                <div class="field has-addons">
                    <p class="control">
                        <input class="input" v-model.number="purchase.amount">
                    </p>
                    <p class="control">
                        <a 
                            class="button"
                            @click="saveChanges(purchase.id, purchase.amount)">
                            <i class="fas fa-check"></i>
                        </a>
                        <a 
                            class="button"
                            @click="resetChanges(purchase.id)">
                            <i class="fas fa-times"></i>
                        </a>
                    </p>
                </div>
            </span>
            <span v-else>x {{purchase.amount}} шт.</span>
        </td>
        <td>{{purchase.price * purchase.amount}} руб.</td>
        <td class="is-center">
            <div class="buttons">
                <a 
                    class="button is-danger" 
                    @click="removeFromCartById(purchase.id)">
                    <span class="icon is-small">
                        <i class="fas fa-trash"></i>
                    </span>
                </a>
                <a 
                    class="button is-info"
                    @click="toggleToWishlistById(purchase.id)">
                    <span class="icon is-small">
                        <i class="fa-star" :class="[ hasInWishList(purchase.id) ? 'fas': 'far']"></i>
                    </span>
                </a>
                <template v-if="is_editing">
                    <button 
                        class="button"
                        @click="resetChanges(purchase.id)">Отменить</button>
                </template>
                <template v-else>
                    <button 
                        class="button"
                        @click="editInfoInRow(purchase.id)">Редактировать</button>
                </template>
            </div>
        </td>
    </tr>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["purchase"],
  data() {
    return {
      is_editing: false
    };
  },
  computed: {
    ...mapState("wishlist", ["wishlist"])
  },
  methods: {
    ...mapActions("cart", ["removeFromCartById", "changeAmountFromCartById"]),
    ...mapActions("wishlist", ["toggleToWishlistById"]),
    hasInWishList(purchase_id) {
      return !!this.lodash.find(this.wishlist, { purchase_id });
    },
    editInfoInRow(purchase_id) {
      this.is_editing = true;
    },
    saveChanges(purchase_id, purchase_amount){
        this.is_editing = false;
        console.log(purchase_id, purchase_amount)
        this.changeAmountFromCartById([purchase_id, purchase_amount])
    },
    resetChanges() {
      this.is_editing = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.amount{
    width: 12em;
    .control{
        .input{
            width: 4em;
        }
    }
}
tr {
    td {
        .buttons {
            width: 20em;
        }
        vertical-align: middle !important;
        img {
            max-height: unset;
        }
    }
}
</style>
