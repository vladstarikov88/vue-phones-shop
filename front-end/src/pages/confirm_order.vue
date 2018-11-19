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
                        <div class="control">
                            <input class="input" type="text" placeholder="Имя">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <input class="input" type="text" placeholder="Адрес доставки">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control has-icons-right">
                            <input class="input" type="email" placeholder="Email">
                            <span class="icon is-small is-right">
                                <i class="fas fa-exclamation-triangle"></i>
                            </span>
                        </div>
                    </div>
                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-link">Подтвердить и оплатить</button>
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
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            modal_address_is_open: false, 
            addresses: [
                {
                    id: 0,
                    address: "Ростов-на-Дону, ул. Красноармейская 210",
                    username: "John Smith",
                    email: "john@example.com"
                }
            ]
        }
    },
    components: {
        AddressInfo,
        ModalAddAddress
    },
    computed: {
        ...mapGetters('user', ['getAccessTocken']),
        ...mapGetters('user', ['user']),
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
