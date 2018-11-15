<template>
    
    <section class="section">
        <div v-if="wishes && wishes.length">
            <table class="table is-fullwidth">
                <thead>
                <tr>
                    <th>Миниатюра</th>
                    <th>Модель</th>
                    <th>Цена</th>
                    <th>Дата добавления</th>
                </tr>
                </thead>
                <tbody>
                    <table-wishlist-row
                        v-for="wish in wishes" 
                        :key="wish.id"
                        :wish="wish">
                    </table-wishlist-row>
                </tbody>
            </table>
        </div>
        <p class="title is-5" v-else>Список желаний пуст</p>
    </section>

</template>
<script>
import moment from 'moment'
import {mapState} from 'vuex'
import TableWishlistRow from '@/components/TableWishlistRow'
export default {
    name: 'wishlist',
    data() {
        return {
            phones: []
        }
    },
    components: {
        TableWishlistRow
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
            const promises = this.lodash.map(this.wishlist, ({phone_id}) =>
                this.axios.get('/phone', {id: phone_id})
                .then(({data}) => data)
            );
            Promise.all(promises).then( data => {
                this.phones = data
            })
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
