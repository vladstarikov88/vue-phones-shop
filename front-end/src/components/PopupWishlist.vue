<template>
    <div class="popup box">
        <table v-if="products && products.length" class="table is-fullwidth">
            <thead>
            <tr>
                <th>Миниатюра</th>
                <th>Модель</th>
                <th>Цена</th>
                <th>Убрать</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="product in products">
                <tr :key="product.id">
                <td>
                    <figure class="image is-64x64"><img :src="product.image_url" alt=""></figure>
                </td>
                <td class="pre">{{product.name}}</td>
                <td class="pre">{{product.price}} руб.</td>
                <td class="is-center">
                    <a class="button is-danger" @click="removeFromWishlistById(product.id)">
                    <span class="icon is-small">
                        <i class="fas fa-trash"></i>
                    </span>
                    </a>
                </td>
                </tr>
            </template>
            </tbody>
        </table>
        <p class="title is-5" v-else>Список желаний пуст</p>
    </div>
</template>
<script>
import {mapState, mapGetters, mapActions} from 'vuex';
export default {
    name: "popup-wishlist",
    data() {
        return {
            phones: []
        }
    },
    computed: {
        ...mapState('wishlist', ['wishlist']),
        ...mapGetters('wishlist', ['getWishlist']),
        products() {
            const raw_products = this.lodash.map(this.wishlist, ({phone_id}) => {
                const phone = this.lodash.find(this.phones, {id: phone_id})
                if (phone) {
                    return {
                        price: phone.price,
                        name: phone.name,
                        image_url: phone.image_url,
                        id: phone_id,
                    }
                }
                return null
            })
            return this.lodash.filter(raw_products)
        }
    },
    methods: {
        ...mapActions('wishlist', ['removeFromWishlistById']),
        fetchPhones() {
            const promises = this.lodash.map(this.wishlist, ({phone_id})=>
                this.axios.get('/phone', {id: phone_id}).then(({data})=> data)
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
            immediate: true
        }
    }
    
}
</script>
<style scoped lang="scss">
.table { 
  th, td{
    text-align: center;
  }
  tr td {
    vertical-align: middle!important;
    img {
      max-height: unset;
    }
  }
  .pre {
      white-space: pre;
  }
}
</style>
