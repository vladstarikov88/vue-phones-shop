<template>
    
    <section class="section">
        <div class="container" v-show="!loading">
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
              :phone="current_wish"
              @add-to-cart="addToCart">
            </modal-add-to-cart>
        </div>
        <loader v-show="loading"></loader>
    </section>
 
</template>
<script>
import moment from '@/plugins/moment'
import {mapState, mapActions} from 'vuex'
import TableWishlistRow from '@/components/TableWishlistRow'
import ModalAddToCart from '@/components/modal/ModalAddToCart'
import {db} from '@/plugins/FirebasePlugin.js'
import Loader from '@/components/Loader';
export default {
    name: 'wishlist',
    data() {
      return {
        phones: [],
        modal_is_open: false,
        current_wish: {},
        loading: false
      }
    },
    components: {
      TableWishlistRow,
      ModalAddToCart,
      Loader
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
              date: moment(date*1000).fromNow(),
              quantity: phone.quantity
            }
          }
          return null
        })
      return this.lodash.filter(raw_wishes)
      }
    },
    watch: {
      wishlist: {
        deep: true,
        handler(new_val, old_val) {
          if (new_val != old_val) {
            this.fetchPhones()
          }
        },
        immediate: true,
      }
    },
    methods: {
      ...mapActions('cart', ['addToCartById']),
      fetchPhones() {
        const promises = this.lodash.map(this.wishlist, ({phone_id}) => {
          this.loading = true
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
                quantity: phone.quantity,
                image_url: phone.image_url
              }
            }
          })
        })
        Promise.all(promises)
        .then(data => this.phones = data)
        .finally(() => this.loading = false)
      },
      openModal(wish) {
        this.modal_is_open = true;
        this.current_wish = wish
      },
      closeModal() {
        this.modal_is_open = false
      },
      addToCart(id, current_amount) {
        this.addToCartById([id, current_amount]);
        this.$notify({
          message: "Товар был успешно добавлен в корзину.",
          status: "info"
        });
      }
    },
}
</script>
