<template>
    <tr :key="purchase.id">
        <td>
            <figure class="image is-64x64"><img :src="purchase.image_url" alt=""></figure>
        </td>
        <td>{{purchase.name}}</td>
        <td>x {{purchase.amount}} шт.</td>
        <td>{{purchase.price * purchase.amount}} руб.</td>
        <td class="is-center">
            <div class="buttons">
            <a class="button is-danger" @click="removeFromCartById(purchase.id)">
                <span class="icon is-small">
                <i class="fas fa-trash"></i>
                </span>
            </a>
            <a 
                class="button is-info"
                @click="toggleToWishlistById(purchase.id)">
                <span class="icon is-small">
                <i class="fa-star" :class="[ hasInWishList(purchase.id) ? 'fas': 'far']"></i>
                </span>
            </a>
            <button 
                class="button"
                @click="editInfoInRow(purchase.id)">Редактировать</button>
            </div>
        </td>
    </tr>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    props: ['purchase'],
    computed: {
        ...mapState('wishlist', ['wishlist'])
    },
    methods: {
        ...mapActions('cart',['removeFromCartById']),
        ...mapActions('wishlist', ['toggleToWishlistById']),
        hasInWishList(phone_id) {
            return !!this.lodash.find(this.wishlist, {phone_id})
        },
        editInfoInRow(purchaseId) {
            console.log(purchaseId)
        }
    }
}
</script>
