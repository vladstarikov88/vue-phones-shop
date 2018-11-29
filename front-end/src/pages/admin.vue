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
      
      <div class="file">
        <label class="file-label">
          <input class="file-input" type="file" name="resume" @change="uploadImgToFilestore">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Выберите файл
            </span>
          </span>
        </label>
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
  </section>
</template>

<script>
import {db, storage} from '@/plugins/FirebasePlugin.js'
export default {
  data() {
    return {
      new_phone: {
        name: null,
        category_name: null,
        is_available: null,
        price: null,
        quantity: null,
        img: null
      }
    }
  },
  methods: {
    uploadImgToFilestore(e) {
      this.new_phone.img = e.target.files[0];
      console.log(this.new_phone.img)
      console.log('Изображение добавлено в data')
    },
    addToFirestore() {
      const image = this.new_phone.img
      storage.ref(image.name)
        .put(image)         // отправляем на сервак изображение
        .then(img =>  storage.ref().child(img.ref.name).getDownloadURL() )        // получаем урл
        .then(image_url => {
          return db.collection('phones').add({
            name: this.new_phone.name,
            category_name: this.new_phone.category_name,
            is_available: this.new_phone.is_available,
            price: this.new_phone.price,
            quantity: this.new_phone.quantity,
            image_url
          })
        })          // отправляем всю инфу о телефоне вместе со ссылкой на фото
        .then(previous_data => {
          db.collection('phones').doc(previous_data.id).update({
            id: previous_data.id
          })
          return previous_data
        })          // добавляем айдишник
        .then(doc => console.log(doc))
        .catch(e => console.log(e))
    }
  }
}
</script>

<style lang="scss" scoped>
  .form {
    max-width: 25em;
    margin: 0 auto 1em;
    .file{
      margin-bottom: 1em;
    }
  }
</style>
