<template>
  <tr 
    :key="purchase.id"
    :class="{active : is_editing}"
    v-click-outside="resetChanges">
    <td>
      <figure class="image is-75x75"><img :src="purchase.image_url" alt=""></figure>
    </td>
    <td>{{purchase.name}}</td>
    <editable-cell 
      :amount='purchase.amount'
      :is-editing="is_editing" 
      @cancel="deactiveEditing"
      @edit="saveChanges"
      @edit-info="editInfoInRow">
    </editable-cell>
       
    <td>{{total_price}} руб.</td>
    <td class="is-center">
      <div class="buttons">
        <a class="button is-warning"
           @click="editInfoInRow(purchase.id)">
          <span class="icon is-small">
              <i class="fa-edit" :class="[ is_editing ? 'fas': 'far']"></i>
          </span>
        </a>
        <a class="button is-info"
           @click="toggleToWishlistById(purchase.id)">
          <span class="icon is-small">
            <i class="fa-star far"></i>
          </span>
        </a>
        <a class="button is-danger" 
           @click="confirmRemove(purchase.id)">
          <span class="icon is-small">
              <i class="fas fa-trash"></i>
          </span>
        </a>
      </div>
    </td>
    <td>
      <a class="button is-warning"
        @click="markPurchaseById(purchase.id)">
        <span class="icon">
          <i class="fa-check-square" :class="[purchase.selected ? 'fas' : 'far']"></i>
        </span>
      </a>  
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
  needConfirmationMethods: {
    confirmRemove: {
      accept_label: 'Удалить',
      cancel_label: 'Отмена',
      message() {
        return `Удалить товар ${this.purchase.name} из корзины`
      },
      handler(id) {
        this.removeFromCartById(id)
      }
    }
  },
  methods: {
    ...mapActions("cart", [
      "removeFromCartById", 
      "changeAmountFromCartById",
      "markPurchaseById"
    ]),
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
    },
    resetChanges() {
      this.is_editing = false;
    }
  },
  created() {
    this.amount = this.purchase.amount;
  },
};
</script>
<style lang="scss" scoped>
.amount{
  max-width: 18em;
  min-width: 12em;
  .control{
    .input{
      max-width: 5em;
    }
  }
}
</style>
