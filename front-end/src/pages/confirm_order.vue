<template>
    <section class="section">
        <div class="container">
            <h1 class="title">Оформить заказ</h1>
            <div v-if="getAccessTocken">
                <div class="content">
                    <div class="box-container">
                        <address-info 
                            v-for="address in addresses"
                            :key="address.id"
                            :address="address"
                            @edit="openModal">
                        </address-info>
                    </div>
                </div>
            </div> 
            <div v-else>
                <address-form 
                    :address="address"
                    @send-form="sendForm">
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
        <modal-window
            @close="closeModal"
            v-if="modal_edit_form"
            slot="modal">
            <address-form 
                :id="addresses[current_id]"
                :email="addresses[current_id].email"
                title="Редактирование адреса"
                @save-form="saveForm">
                <template 
                    slot-scope="{ changeForm }"
                    slot="changeform">
                    <button 
                        class="button is-link"
                        :disabled="errors.items.length > 0"
                        @click="changeForm()">
                            Сохранить
                    </button>
                </template>
            </address-form>
        </modal-window>
    </section>
</template>

<script>
import ModalWindow from "@/components/modal/ModalWindow";
import AddressInfo from "@/components/address/AddressInfo";
import AddressForm from "@/components/address/AddressForm";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      //modal_address_is_open: false,
      modal_edit_form: false,
      current_id: null,
      address: {
        username: null,
        address: null,
        email: null
      },
      addresses: [
        {
          id: 0,
          username: "Vlad Starikov",
          address: "Gorky st., 23",
          email: "starikov@example.com"
        },
        {
          id: 1,
          username: "testtestets",
          address: "testtesttetstdfs",
          email: "test@example.com"
        }
      ]
    };
  },
  components: {
    AddressInfo,
    AddressForm,
    ModalWindow
  },
  computed: {
    ...mapGetters("user", ["getAccessTocken"]),
    ...mapState("cart", ["cart"])
  },
  methods: {
    ...mapActions("cart", ["clearCart"]),
    // addNewAddress(new_address) {
    //     new_address.id = this.addresses.length;
    //     this.addresses.push(new_address)
    // },
    sendForm(obj) {
      const user_data = JSON.parse(
        JSON.stringify({
          username: this.form.username,
          address: this.form.address,
          email: this.form.email,
          products: this.cart
        })
      );
      console.log(user_data);

      const wait = new Promise((resolve, reject) => {
        setTimeout(() => resolve({}), 2000);
      });
      wait.then(() => {
        this.clearCart();
        this.$router.push("/");
      });
    },
    saveForm(address) {
      this.addresses.splice(address.id, 1, address);
      this.modal_edit_form = false;
    },
    openModal(id) {
      this.modal_edit_form = true;
      this.current_id = id;
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
