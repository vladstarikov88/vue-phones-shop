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
                            :address="address"></address-info>
                    </div>
                </div>
            </div> 
            <div v-else>
                <address-form 
                    :form="form"
                    @send-form="sendForm">
                    <template
                        scope="{ checkForm }"
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
        <template v-if="modal_edit_dorm">
            <modal-window>
                <address-form></address-form>
            </modal-window>
        </template>
    </section>
</template>

<script>
import AddressInfo from '@/components/AddressInfo'
import AddressForm from '@/components/AddressForm'
import {mapGetters, mapState, mapActions} from 'vuex'
export default {
    data() {
        return {
            modal_address_is_open: false, 
            modal_edit_dorm: false,
            form: {
                username: null, 
                address: null,
                email: null,
            },
            addresses: [
                {
                    id: 0,
                    username: 'Vlad Starikov',
                    address: 'Gorky st., 23',
                    email: 'starikov@example.com'
                }
            ]
        }
    },
    components: {
        AddressInfo,
        AddressForm
    },
    computed: {
        ...mapGetters('user', ['getAccessTocken']),
        ...mapState('cart', ['cart'])
    },
    methods: {
        ...mapActions('cart', ['clearCart']),
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
        

            const wait = new Promise( (resolve, reject) => {
                setTimeout( () => resolve({}), 2000)
            })
            wait.then(() => {
                this.clearCart()
                this.$router.push('/')
            })
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
