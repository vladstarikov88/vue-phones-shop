<template>
  <modal-window v-on:close="close">
    <h4 class="title is-4 has-text-centered">Добавить в корзину</h4>
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

              <input
                :class="{'is-danger' : errors.has('between_field')}"
                class="input"
                name="between_field"
                type="number"
                v-model.number="current_amount"
                v-validate="`between:1,${phone.quantity}`">
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
        <p class="has-text-right">На складе: {{phone.quantity}} шт.</p>
        <button
          :disabled="errors.has('between_field')"
          @click="addToCart()"
          class="button is-success">Добавить
        </button>
      </div>
    </div>
  </modal-window>

</template>
<script>
  import ModalWindow from "./ModalWindow";
  import {mapState} from "vuex";

  export default {
    props: ["isOpen", "phone", 'hasInWishList'],
    data() {
      return {
        current_amount: 1,
      };
    },
    components: {
      ModalWindow
    },
    computed: {
      ...mapState('wishlist', ['wishlist']),
      total_price() {
        return this.phone.price * (this.current_amount || 1);
      }
    },
    methods: {
      addToCart() {
        this.$emit('add-to-cart', this.phone.id, this.current_amount);
        this.close();
        // если есть в списке желаний, то открывать модалку подтверждения

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
