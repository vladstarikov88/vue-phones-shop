<template>
  <transition name="fade">
    <div class="popup box">
      <table v-if="products && products.length" class="table is-fullwidth">
        <thead>
        <tr>
          <th>Миниатюра</th>
          <th>Модель</th>
          <th>Цена</th>
          <th class="pre">Дата добавления</th>
          <th>Убрать</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="product in products">
          <tr :key="product.id">
            <td>
              <figure class="image is-75x75"><img :src="product.image_url" alt=""></figure>
            </td>
            <td>{{product.name}}</td>
            <td>{{product.price}} руб.</td>
            <td><dynamic-from-now :date="product.date"></dynamic-from-now></td>
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
      <loader-circle v-if="loading"></loader-circle>
      <p class="title is-5"
        v-if="!products.length && !loading">
        Список желаний пуст
      </p>
    </div>
  </transition>
</template>
<script>
import moment from "@/plugins/moment";
import { mapGetters, mapActions } from "vuex";
import {db} from '@/plugins/FirebasePlugin.js'
import LoaderCircle from '@/components/loader/LoaderCircle'
export default {
  name: "popup-wishlist",
  data() {
    return {
      phones: [],
      loading: false
    };
  },
  components: {
    LoaderCircle
  },
  computed: {
    ...mapGetters("wishlist", { wishlist: "getLastFiveFavorites" }),
    products() {
      const raw_products = this.lodash.map( this.wishlist, ({ phone_id, date }) => {
          const phone = this.lodash.find(this.phones, { id: phone_id });
          if (phone) {
            return {
              price: phone.price,
              name: phone.name,
              image_url: phone.image_url,
              id: phone_id,
              date: date * 1000
            };
          }
          return null;
        }
      );
      return this.lodash.filter(raw_products);
    }
  },
  watch: {
    wishlist: {
      deep: true,
      handler: "fetchPhones",
      immediate: true
    }
  },
  methods: {
    ...mapActions("wishlist", ["removeFromWishlistById"]),
    fetchPhones() {
      const promises = this.lodash.map(this.wishlist, ({phone_id}) => {
        this.loading = true
        return db.collection('phones')
        .doc(phone_id)
        .get()
        .then(doc => {
          if(doc.exists) {
            const phone = doc.data()
            return {
              id: phone_id,
              image_url: phone.image_url,
              name: phone.name,
              price: phone.price,
            }
          }
        })
      })
      Promise.all(promises)
      .then(data => this.phones = data)
      .finally(() => this.loading = false)
    }
  }
};
</script>