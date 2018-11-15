<template>
  <tr :key="purchase.id">
    <td>
      <figure class="image is-64x64"><img :src="purchase.image_url" alt=""></figure>
    </td>
    <td>{{purchase.name}}</td>
    <editable-cell 
      :amount='purchase.amount'
      :is-editing="is_editing" 
      @cancel="deactiveEditing"
      @edit="saveChanges">

    </editable-cell>
       
<td>{{total_price}}</td>
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
          <i class="fa-star far"></i>
        </span>
      </a>
      <template v-if="!is_editing">
        <button 
          class="button"
          @click="editInfoInRow"
          >Редактировать</button>
      </template>
      </div>
    </td>
  </tr>
</template>
<script>
import { mapState, mapActions } from "vuex";
import EditableCell from './EditableCell'
export default {
  props: ["purchase"],
  components: {
    EditableCell
  },
  data() {
    return {
      is_editing: false,
    };
  },
  computed: {
    total_price() {
      return this.errors.has('between_field') ? '-' : this.purchase.price * this.purchase.amount
    }
  },
  methods: {
    ...mapActions("cart", ["removeFromCartById", "changeAmountFromCartById"]),
    ...mapActions("wishlist", ["toggleToWishlistById"]),
    editInfoInRow() {
      this.is_editing = true;
    },
    saveChanges(purchase_amount) {
      this.changeAmountFromCartById([this.purchase.id, purchase_amount]);
      this.is_editing = false;
    },
    deactiveEditing() {
      this.is_editing = false;
    }
  },
  created() {
    this.amount = this.purchase.amount;
  },
};
</script>
<style lang="scss" scoped>
.amount {
  width: 12em;
  .control {
    .input {
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
