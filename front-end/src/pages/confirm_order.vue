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
                <div class="form">
                    <div class="field">
                        <div class="control has-icons-right">
                            <input 
                                class="input" 
                                type="text" 
                                placeholder="Имя"
                                v-model="username"
                                v-validate="'required|min:8'" 
                                data-vv-as="field" 
                                name="min_field">
                            <span class="icon is-small is-right">
                                <i class="fas fa-exclamation-triangle"></i>
                            </span>
                            <p
                                class="help is-danger"
                                v-if="errors.has('min_field')">
                                Длина имени должна быть не менее 8 символов</p>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control has-icons-right">
                            <input 
                                class="input" 
                                type="text" 
                                placeholder="Адрес доставки"
                                v-model="address"
                                v-validate="'required'"
                                data-vv-as="field" >
                            <span class="icon is-small is-right">
                                <i class="fas fa-exclamation-triangle"></i>
                            </span>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control has-icons-right">
                            <input 
                                class="input" 
                                type="email" 
                                placeholder="Email"
                                v-model="email"
                                v-validate="'required|email'" 
                                data-vv-as="email" 
                                name="email_field"
                                :class="{'is-danger' : errors.has('email_field')}">
                            <span class="icon is-small is-right">
                                <i class="fas fa-exclamation-triangle"></i>
                            </span>
                            <p 
                                class="help is-danger" 
                                v-if="errors.has('email_field')">
                                Неверный формат</p>
                        </div>
                    </div>
                    <div class="field is-grouped">
                        <div class="control">
                            <button 
                                class="button is-link"
                                :disabled="errors.items.length > 0"
                                @click="sendForm">Подтвердить и оплатить</button>
                        </div>
                    </div>
                </div>
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
import ModalAddAddress from '@/components/modal/ModalAddAddress'
import {mapGetters, mapState} from 'vuex'
export default {
    data() {
        return {
            modal_address_is_open: false, 
            username: null, 
            address: null,
            email: null
            // addresses: [
            //     {
            //         id: 0,
            //         address: "Ростов-на-Дону, ул. Красноармейская 210",
            //         username: "John Smith",
            //         email: "john@example.com"
            //     }
            // ]

        }
    },
    components: {
        AddressInfo,
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
            let user_data = {
                username: this.username,
                address: this.address, 
                email: this.email,
                products: this.cart 
            };
            user_data = JSON.parse(JSON.stringify(user_data));
            console.log(user_data)

            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.$notify({
                        message: "Заявка успешно отправлена",
                        status: "info"
                    });
                return;
                }
            });
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
