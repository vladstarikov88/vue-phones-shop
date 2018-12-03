<template>
  <section class="section">
    <div class="container check_purchases" v-if="selected_purchases && selected_purchases.length">
      <h1 class="title">Проверьте выбранные для покупки товары</h1>
      <selected-purchases
        :purchases="selected_purchases"
        :total_price="total_price">
      </selected-purchases>
      <p class="title is-6">Итог: {{total_price}} руб.</p>
    </div>
    <div class="container">
      <h1 class="title">Оформить заказ</h1>
      <template v-if="getAccessToken">
        <div class="content">
          <div class="box-container">
            <template v-if="addresses && addresses.length">
              <address-info
                :address="address"
                :is-selected="selected_address_id === address.id"
                :key="address.id"
                @edit="openEditorAddress(address.id)"
                @select="selectAddress(address.id)"
                v-for="address in addresses">
              </address-info>
            </template>
          </div>
        </div>
        <button :disabled="!selected_address_id && selected_address_id!==0"
                @click="submitActiveAddress"
                class="button is-info">Оформить заказ
        </button>
      </template>
      <template v-else>
        <address-form
          @cancel="$router.push('cart')"
          @save-form="submit">
        </address-form>
      </template>
    </div>
    <modal-edit-address
      :address="current_address"
      @close="closeModal"
      @save-form="saveAddress"
      v-if="modal_edit_form">
    </modal-edit-address>
  </section>
</template>

<script>
  import SelectedPurchases from '@/components/TableCart/SelectedPurchases'
  import AddressInfo from "@/components/address/AddressInfo";
  import AddressForm from "@/components/address/AddressForm";
  import ModalEditAddress from "@/components/modal/ModalEditAddress.vue";
  import {mapGetters, mapActions} from "vuex";

  export default {
    data() {
      return {
        modal_edit_form: false,
        addresses: [],
        current_address: {},
        selected_address_id: null,

      };
    },
    mounted() {
      this.fetchAddresses()
    },
    components: {
      ModalEditAddress,
      AddressInfo,
      AddressForm,
      SelectedPurchases
    },
    computed: {
      ...mapGetters("user", ["getAccessToken"]),
      ...mapGetters("cart", ["getSelectedPhones"]),
      total_price() {
        return this.selected_purchases.reduce((sum, item) => sum + item.price * item.amount, 0);
      }
    },
    asyncComputed: {
      selected_purchases() {
        return this.lodash.reduce(this.getSelectedPhones, (acc, {phone_id, amount}) => {
          this.axios('/phone', {id: phone_id}).then(res => {
            const phone = res.data;
            acc.push({
              price: phone.price,
              name: phone.name,
              image_url: phone.image_url,
              id: phone_id,
              amount,
            });
          });

          return acc
        }, [])
      },
    },
    methods: {
      ...mapActions("cart", ["clearCart", "removeSelectedFromCart"]),
      submit(address) {
        if(this.selected_purchases && this.selected_purchases.length && address) {
          const products = this.lodash.map(this.selected_purchases, 'id');
          const data = {
            products,
            address
          };
          this.$notify({
            message: 'Заказ успешно оформлен',
            status: 'success'
          });
          this.removeSelectedFromCart();
          console.log(data);
          this.$router.push('/')
        }
      },
      submitActiveAddress() {
        this.axios.get('address', {id: this.selected_address_id})
          .then(res => {
            this.submit(res.data)
          })
      },
      selectAddress(id) {
        this.selected_address_id = id
      },
      fetchAddress(id) {
        this.axios.get('address', {id})
          .then(res => {
            this.current_address = res.data
          })
      },
      fetchAddresses() {
        this.axios.get('/addresses')
          .then((res) => {
            this.addresses = res.data.addresses
          });
      },
      saveAddress(address) {
        this.axios
          .post('address', address)
          .then(res => {
            this.addresses = res.data.addresses
          });
        this.modal_edit_form = false;
      },
      openEditorAddress(id) {
        this.fetchAddress(id);
        this.modal_edit_form = true;
      },
      closeModal() {
        this.modal_edit_form = false;
      },
    },

  };
</script>

<style lang="scss" scoped>
  .title {
    text-align: center;
  }

  .box-container {
    display: flex;
    align-items: start;
    margin-bottom: 1em;
  }

  .check_purchases {
    margin-bottom: 3rem;
  }
</style>
