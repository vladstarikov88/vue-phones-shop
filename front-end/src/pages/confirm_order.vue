<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Оформить заказ</h1>
      <div v-if="getAccessTocken">
        <div class="content">
          <div class="box-container">
            <template v-if="addresses && addresses.length">
              <address-info
                v-for="address in addresses"
                :key="address.id"
                :address="address"
                @edit="openEditorAddress(address.id)">
              </address-info>
            </template>
          </div>
        </div>
      </div>
      <div v-else>
        <address-form
          :address="address"
          >
          <template
            slot-scope="{ checkForm }"
            slot="submit">
            <button
              class="button is-link"
              :disabled="errors.items.length > 0"
              @click="checkForm()">
              Подтвердить и оплатить
            </button>
          </template>
        </address-form>
      </div>
    </div>
    <modal-edit-address
      :id="current_id"
      @close="closeModal"
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
        addresses: []
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
      ...mapGetters("user", ["getAccessTocken"]),
      ...mapState("cart", ["cart"])
    },
    methods: {
      ...mapActions("cart", ["clearCart"]),
      fetchAddresses() {
        this.axios.get('/addresses')
          .then((res) => {
            this.addresses = res.data.addresses
          });
      },
      saveForm(address) {
        this.addresses.splice(address.id, 1, address);
        this.modal_edit_form = false;
      },
      openEditorAddress(id) {
        this.current_id = id;
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
