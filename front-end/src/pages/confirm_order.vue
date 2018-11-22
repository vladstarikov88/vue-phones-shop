<template>
  <section class="section">
    <div class="container check_purchases" v-if="selected_purchases.length">
      <h1 class="title">Проверьте выбранные для покупки товары</h1>
      <selected-purchases 
        :purchases="selected_purchases"
        :total_price="total_price">
      </selected-purchases>
      <p class="title is-6">Итог: {{total_price}} руб.</p>
    </div>
    <div class="container">
      <h1 class="title">Оформить заказ</h1>
      <div v-if="getAccessToken">
        <div class="content">
          <div class="box-container">
            <template v-if="addresses && addresses.length">
              <address-info
                :address="address"
                :key="address.id"
                @edit="openEditorAddress(address.id)"
                v-for="address in addresses">
              </address-info>
            </template>
          </div>
        </div>
      </div>
      <div v-else>
        <address-form
          @save-form="submit"
          @cancel="$router.push('cart')">
        </address-form>
      </div>
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
  import {mapGetters, mapState, mapActions} from "vuex";

  export default {
    data() {
      return {
        modal_edit_form: false,
        current_id: null,
        addresses: [],
        current_address: {},
        phones: []
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
      ...mapState("cart", ["cart"]),
      selected_purchases() {
        const raw_purchases = this.lodash.map(this.cart, ({phone_id, amount, selected}) => {
          const phone = this.lodash.find(this.phones, {id: phone_id})
          if(phone && selected) {
            return {
              price: phone.price,
              name: phone.name,
              image_url: phone.image_url,
              id: phone_id,
              amount,
              selected
            }
          }
          return null
        })
        return this.lodash.filter(raw_purchases)
      },
      total_price(){
        return this.selected_purchases.reduce((sum, item) => sum+item.price*item.amount, 0);
      }
    },
    methods: {
      ...mapActions("cart", ["clearCart", "removeSelectedFromCart"]),
      submit(address){
        const selected_items = this.cart.filter(item => item.selected === true)
        const user_data = JSON.parse(
          JSON.stringify({
            address,
            products: selected_items
          })
        );
        console.log(user_data)

        const wait = new Promise( resolve =>  setTimeout( () => resolve({}), 2000) )
        wait.then(() => {
          this.removeSelectedFromCart()
          this.$router.push('/')
        })
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
      fetchPhones() {
        const promises = this.lodash.map(this.cart, ({phone_id}) =>
          this.axios.get('/phone', {id: phone_id})
          .then(({data}) => data)
        );
        Promise.all(promises).then( data => {
          this.phones = data
        })
      }
    },
    watch: {
      cart: {
        deep: true,
        handler: 'fetchPhones',
        immediate: true,
      }
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
.check_purchases{
    margin-bottom: 3rem;
}
</style>
