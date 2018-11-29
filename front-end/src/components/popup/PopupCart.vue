<template>
  <transition name="fade">
    <div class="popup box">
      <table v-if="purchases && purchases.length" class="table is-fullwidth">
        <thead>
        <tr>
          <th>Миниатюра</th>
          <th>Модель</th>
          <th>Количество</th>
          <th>Стоимость</th>
          <th>Убрать</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="purchase in purchases">
          <tr :key="purchase.id">
            <td>
              <figure class="image is-75x75"><img :src="purchase.image_url" alt=""></figure>
            </td>
            <td>{{purchase.name}}</td>
            <td>x {{purchase.amount}} шт.</td>
            <td>{{purchase.price * purchase.amount}} руб.</td>
            <td class="is-center">
              <a class="button is-danger" @click="removeFromCartById(purchase.id)">
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
        v-if="!purchases.length && !loading">
         Корзина пуста
      </p>
    </div>
  </transition>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {db} from '@/plugins/FirebasePlugin.js'
import LoaderCircle from '@/components/loader/LoaderCircle'
export default  {
  name: 'popup-cart',
  data() {
    return {
      phones: [],
      loading: false
    }
  },
  components:{
    LoaderCircle
  },
  computed: {
    ...mapState('cart', ['cart']),
    purchases() {
      // Создаем массив покупок из корзины и телефонов полученых с сервера
      const raw_purchases = this.lodash.map(this.cart, ({phone_id, amount}) => {
        //Ищем в полученых телефонах телефон из корзины
        const phone = this.lodash.find(this.phones, {id: phone_id})

        if(phone) {
          return {
            price: phone.price,
            name: phone.name,
            image_url: phone.image_url,
            id: phone_id,
            amount
          }
        }
        return null
      })
      //Избавляемся от нулевых значений
      return this.lodash.filter(raw_purchases)
    }
  },
  watch: {
    //Ватчер должен также называться как называется свойство  в компоеннте за которым будет слежка
    //Каждый раз при изменении свойства за которым следят будет вызван handler
    cart: {
      deep: true,
      //Если хендлер указан как строка то Vue находит одноименный метод в компоненте
      handler: 'fetchPhones',
      // Заставляет сработать хендлер сразу после того как вотчер начал следить за свойством
      immediate: true,
    }
  },
  methods: {
    ...mapActions('cart',['removeFromCartById']),
    fetchPhones() {
      const promises = this.lodash.map(this.cart, ({phone_id, amount, selected}) => {
        this.loading = true;
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
              quantity: phone.quantity,
              amount,
              selected
            }
          }
        })
      })
      Promise.all(promises)
      .then(data => this.phones = data)
      .finally(() => this.loading = false)
    }
  },
}
</script>