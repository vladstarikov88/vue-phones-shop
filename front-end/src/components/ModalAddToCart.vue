<template>
  <modal-window v-on:close="close">
  <h4 class="title is-4">Добавить в корзину</h4>
  <div class="columns">
    <div class="column is-two-trird">
      <figure class="image">
        <img :src="phone.image_url" alt="">
      </figure>
    </div>
    <div class="column content">
      <p class="title is-6">{{ phone.name }}</p>
      <table class="table is-fullwidth">
        <tr>
          <td>Кол-во</td>
          <td>
            <!-- Добавить ограничение на кол-во товаров со склада. В dummy указать оставшееся вол-во товара -->
            <input 
              type="number" 
              class="input" 
              v-validate="'between:1,9999'" 
              :class="{'is-danger' : errors.has('between_field')}"
              name="between_field"
              v-model.number="current_amount">
          </td>
        </tr>
        <tr>
          <td>Цена:</td>
          <td> {{ phone.price }} руб.</td>
        </tr>
        <tr>
          <!-- Исправить, когда кол-во равно 0 -->
          <td>Сумма:</td>
          <td v-if="!errors.has('between_field')">{{ total_price }} руб.</td>
          <td v-else>-</td>
        </tr>
      </table>
        
    </div>
  </div>

    <button 
        class="button" 
        @click="addToCart()"
        :disabled="errors.has('between_field')">Добавить</button>  
  </modal-window>
</template>
<script>
import ModalWindow from "@/components/ModalWindow";
import { mapActions } from "vuex";
export default {
  props: ["isOpen", "phone"],
  data() {
    return {
      current_amount: 1
    };
  },
  components: {
    ModalWindow
  },
  computed: {
    total_price() {
      return this.phone.price * (this.current_amount || 1);
    }
  },
  methods: {
    ...mapActions("cart", ["addToCartById", "removeFromCartById"]),
    addToCart() {
      this.addToCartById([this.phone.id, this.current_amount]);
      this.$notify({
        message: "Товар был успешно добавлен в корзину.",
        status: "info"
      });
      this.close();
    },
    close() {
      this.$emit("close");
    }
  }
};

</script>
<style lang="scss" scoped>
.table {
  td {
    vertical-align: middle !important;
    &:nth-child(2) {
      text-align: right;
    }
  }
}
</style>
