<template>
  <section class="section">
    <div class="container form">
      <div class="field">
        <label class="label">Название телефона</label>
        <div class="control">
          <input class="input" v-model="new_phone.name">
        </div>
      </div>

      <div class="field">
        <label class="label">Категория</label>
        <div class="control">
          <div class="select">
            <select v-model="new_phone.category_name">
              <option value="iphone">iPhone</option>
              <option value="others">Нормальные телефоны</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Продавать или нет?</label>
        <div class="control">
          <div class="select">
            <select v-model="new_phone.is_available">
              <option value="true">тру</option>
              <option value="false">фолс</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Цена</label>
        <div class="control">
          <input class="input" v-model.number="new_phone.price">
        </div>
      </div>

      <div class="field">
        <label class="label">Колличество</label>
        <div class="control">
          <input class="input" v-model.number="new_phone.quantity">
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" @click="addToFirestore">Добавить</button>
        </div>
        <div class="control">
          <button class="button is-text">Очистить</button>
        </div>
      </div>
    </div>
    <div class="container">
      {{phones}}
    </div>
  </section>
</template>

<script>
import {db} from '@/plugins/FirebasePlugin.js'
export default {
  data() {
    return {
      new_phone: {
        id: null,
        name: null,
        category_name: null,
        is_available: null,
        price: null,
        quantity: null
      },
      phones: []
    }
  },
  firestore: {
    phones: db.collection('phones'),
  },
  methods: {
    addToFirestore() {
      db.collection('phones').add({
        id: this.phones.length,
        name: this.new_phone.name,
        category_name: this.new_phone.category_name,
        is_available: this.new_phone.is_available,
        price: this.new_phone.price,
        quantity: this.new_phone.quantity,
      })
      .then(doc => console.log(doc))
    }
  }
}
</script>

<style lang="scss" scoped>
  .form {
    max-width: 25em;
    margin: 0 auto;
  }
</style>
