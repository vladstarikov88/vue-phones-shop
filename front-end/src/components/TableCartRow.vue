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
                        <!-- {{errors.has('between_field')}} -->
                        <input  
                            type="number"
                            class="input"
                            v-model="amount"
                            v-validate="'between:1,9999'" 
                            :class="{'is-danger' : errors.has('between_field')}"
                            name="between_field">
                    </p>
                    <p class="control">
                        <a 
                            class="button"
                            @click="saveChanges(purchase.id, purchase.amount)"
                            :disabled="errors.has('between_field')">
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
        <td v-if="!errors.has('between_field')">{{purchase.price * purchase.amount}} руб.</td>
        <td v-else>-</td>
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
                <template v-if="!is_editing">
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
      is_editing: false,
      amount: 1
    };
  },
  computed: {
    ...mapState("wishlist", ["wishlist"]),
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
        this.amount = this.old_value
        this.is_editing = false;
    }
  },
  created() {
      this.amount = this.purchase.amount
  },
  watch: {
        amount() {
            this.purchase.amount = parseInt(this.amount)
        },
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
