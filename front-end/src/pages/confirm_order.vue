<template>
    <section class="section">
        <div class="container">
            <h1 class="title">Оформить заказ</h1>
            <!-- <div v-if="getAccessTocken">
                <div class="content">
                    <div class="box-container">
                        <address-info 
                            v-for="address in addresses"
                            :key="address.id"
                            :address="address"></address-info>
                    </div>
                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-link">Подтвердить и оплатить</button>
                        </div>
                        <div class="control">
                            <button 
                                class="button is-text"
                                @click="openModal">Добавить новый адрес</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else> -->
            <address-form 
                :form="form"
                @send-form="sendForm"></address-form>
        </div>
        <!-- </div> -->
        <modal-add-address
            v-if="modal_address_is_open"
            @close="closeModal"
            @add-address="addNewAddress"></modal-add-address>
    </section>
</template>

<script>
import AddressInfo from '@/components/AddressInfo'
import AddressForm from '@/components/AddressForm'
import ModalAddAddress from '@/components/modal/ModalAddAddress'
import {mapGetters, mapState} from 'vuex'
export default {
    data() {
        return {
            modal_address_is_open: false, 
            form: {
                username: null, 
                address: null,
                email: null,
            }
        }
    },
    components: {
        AddressInfo,
        AddressForm,
        ModalAddAddress
    },
    computed: {
        ...mapGetters('user', ['getAccessTocken']),
        ...mapState('cart', ['cart'])
    },
    methods: {
        openModal() {
            this.modal_address_is_open = true;
        },
        closeModal() {
            this.modal_address_is_open = false;
        },
        addNewAddress(new_address) {
            new_address.id = this.addresses.length;
            this.addresses.push(new_address)
        },
        sendForm(obj){
            const user_data = JSON.parse(
                JSON.stringify({
                    username: this.form.username,
                    address: this.form.address, 
                    email: this.form.email,
                    products: this.cart 
                })
            );
            console.log(user_data)
        }
    }
}
</script>

<style lang="scss" scoped>
    .title {
        text-align: center;
    }
    .form {
        margin: 0 25vw;
    }
    .box-container{
        display: flex;
        align-items: start;
        margin-bottom: 1em;
    }
</style>
