<template>
    
    <section class="section">
        <div class="container">
            <div v-if="wishes && wishes.length">
                <table class="table is-fullwidth">
                    <thead>
                    <tr>
                        <th>Миниатюра</th>
                        <th>Модель</th>
                        <th>Цена</th>
                        <th>Дата добавления</th>
                        <th>Редактировать</th>
                    </tr>
                    </thead>
                    <tbody>
                        <table-wishlist-row
                            v-for="wish in wishes" 
                            :key="wish.id"
                            :wish="wish"
                            v-on:open-modal="openModal(wish)">
                        </table-wishlist-row>
                    </tbody>
                </table>
            </div>
            <p class="title is-5" v-else>Список желаний пуст</p>
            <modal-add-to-cart
                v-if="modal_is_open"
                v-on:close="closeModal()"
                :key="current_wish.id"
                :phone="current_wish">
            </modal-add-to-cart>
        </div>
    </section>
 
</template>
<script>
import moment from '@/plugins/moment'
import {mapState} from 'vuex'
import TableWishlistRow from '@/components/TableWishlistRow'
import ModalAddToCart from '@/components/modal/ModalAddToCart'
import {db} from '@/plugins/FirebasePlugin.js'
export default {
    name: 'wishlist',
    data() {
        return {
            phones: [],
            modal_is_open: false,
            current_wish: {}
        }
    },
    components: {
        TableWishlistRow,
        ModalAddToCart
    },
    computed: {
        ...mapState('wishlist', ['wishlist']),
        wishes() {
            const raw_wishes = this.lodash.map(this.wishlist, ({phone_id, date}) => {
                const phone = this.lodash.find(this.phones, {id: phone_id})

                if(phone) {
                    return {
                        price: phone.price,
                        name: phone.name,
                        image_url: phone.image_url,
                        id: phone_id,
                        date: moment(date*1000).fromNow()
                    }
                }
                return null
            })
        return this.lodash.filter(raw_wishes)
        }
    },
    methods: {
        fetchPhones() {
            const promises = this.lodash.map(this.wishlist, ({phone_id}) => {
                return db.collection('phones')
                .doc(phone_id)
                .get()
                .then(doc => {
                    if(doc.exists){
                        const phone = doc.data()
                        return {
                            id: phone_id,
                            name: phone.name,
                            price: phone.price,
                            quantity: phone.quantity
                        }
                    }
                })
            })
            Promise.all(promises).then(data => this.phones = data)
        },
        openModal(wish) {
            this.modal_is_open = true;
            this.current_wish = wish
        },
        closeModal() {
            this.modal_is_open = false
        }
    },
    watch: {
        wishlist: {
            deep: true,
            handler: 'fetchPhones',
            immediate: true,
        }
    }
}
</script>
