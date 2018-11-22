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
                            @click="checkForm()"
                            v-if="!selected_purchases.lenght">
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
                :address="addresses[current_id]"
                @save-form="saveForm">
                <template slot="title">
                    <h4 class="title is-4">Редактирование адреса</h4>
                </template>
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
import ModalWindow from '@/components/modal/ModalWindow'
import AddressInfo from '@/components/address/AddressInfo'
import AddressForm from '@/components/address/AddressForm'
import SelectedPurchases from '@/components/TableCart/SelectedPurchases'
import {mapGetters, mapState, mapActions} from 'vuex'
export default {
    data() {
        return {
            //modal_address_is_open: false, 
            modal_edit_form: false,
            current_id: null,
            address: {
                username: null || 'twrewtetrtewrewt', 
                address: null || 'dsfsd fsd fsd s',
                email: null || 'fdsfsd@fd.sf',
            },
            addresses: [
                {
                    id: 0,
                    username: 'Vlad Starikov',
                    address: 'Gorky st., 23',
                    email: 'starikov@example.com'
                },
                {
                    id: 1,
                    username: 'testtestets',
                    address: 'testtesttetstdfs',
                    email: 'test@example.com'
                }
            ],
            phones: []
        }
    },
    components: {
        AddressInfo,
        AddressForm,
        ModalWindow,
        SelectedPurchases
    },
    computed: {
        ...mapGetters('user', ['getAccessTocken']),
        ...mapState('cart', ['cart']),
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
        ...mapActions('cart', ['clearCart', 'removeSelectedFromCart']),
        // addNewAddress(new_address) {
        //     new_address.id = this.addresses.length;
        //     this.addresses.push(new_address)
        // },
        sendForm(obj){
            let selected_items = this.cart.filter(item => item.selected === true)

            const user_data = JSON.parse(
                JSON.stringify({
                    username: this.address.username,
                    address: this.address.address, 
                    email: this.address.email,
                    products: selected_items
                })
            );
            console.log(user_data)

            const wait = new Promise( (resolve, reject) => {
                setTimeout( () => resolve({}), 2000)
            })
            wait.then(() => {
                this.removeSelectedFromCart()
                this.$router.push('/')
            })
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
    }
}
</script>

<style lang="scss" scoped>
.title {
    text-align: center;
}
.box-container{
    display: flex;
    align-items: start;
    margin-bottom: 1em;
}
.check_purchases{
    margin-bottom: 3rem;
}
</style>
