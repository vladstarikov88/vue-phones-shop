<template>
  <section class="section">
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
      };
    },
    mounted() {
      this.fetchAddresses()
    },
    components: {
      ModalEditAddress,
      AddressInfo,
      AddressForm,
    },
    computed: {
      ...mapGetters("user", ["getAccessToken"]),
      ...mapState("cart", ["cart"])
    },
    methods: {
      ...mapActions("cart", ["clearCart"]),
      submit(address) {
        console.log(address)
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
      }
    }
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
</style>
