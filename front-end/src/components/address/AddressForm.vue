<template>
  <div class="form">
    <h4 class="title is-4" v-if="title">{{title}}</h4>
    <form action="" v-if="address" @submit.prevent="saveAddress">
      <div class="field">
        <label class="label">Имя адресата:</label>
        <div class="control has-icons-right">
          <input
            :class="{'is-danger' : errors.has('min_field')}"
            class="input"
            name="min_field"
            placeholder="Имя адресата"
            type="text"
            v-model="address.username"
            v-validate="'required|min:8'">
          <span class="icon is-small is-right">
          <i class="fas fa-exclamation-triangle"></i>
        </span>
          <p
            class="help is-danger"
            v-if="errors.has('min_field')">
            Длина имени должна быть не менее 8 символов
          </p>
        </div>
      </div>
      <div class="field">
        <label class="label">Адрес доставки:</label>
        <div class="control has-icons-right">
          <input
            :class="{'is-danger' : errors.has('address')}"
            class="input"
            name="address"
            placeholder="Адрес доставки"
            type="text"
            v-model="address.address"
            v-validate="'required'">
          <span class="icon is-small is-right">
          <i class="fas fa-exclamation-triangle"></i>
        </span>
          <p
            class="help is-danger"
            v-if="errors.has('address')">
            Поле является обязательным</p>
        </div>
      </div>
      <div class="field">
        <label class="label">Электронная почта:</label>
        <div class="control has-icons-right">
          <input
            :class="{'is-danger' : errors.has('email_field')}"
            class="input"
            name="email_field"
            placeholder="Email"
            type="email"
            v-model="address.email"
            v-validate="'required|email'">
          <span class="icon is-small is-right">
          <i class="fas fa-exclamation-triangle"></i>
        </span>
          <p
            class="help is-danger"
            v-if="errors.has('email_field')">
            Неверный формат</p>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <input type="submit" class="button is-link" :disabled="errors.any()">
        </div>
        <div class="control">
          <button type="button" class="button is-text" @click="$emit('cancel')">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    props: {
      address: {
        type: Object,
        default() {
          return {
            name: '',
            address: '',
            email: '',
          }
        }
      },
      title: {
        type: String,
        default: ''
      }
    },
    methods: {
      saveAddress() {
        this.$validator.validateAll()
          .then((is_valid)=> {
            if(is_valid) {
              this.$emit('save-form', this.address)
            }
          })
          .catch((error)=> {
            this.$notify({
              message: error,
              status: 'danger',
            })
          })
      },
    },
  };
</script>

<style lang="scss" scoped>
  .form {
    max-width: 25em;
    margin: 0 auto;
  }
</style>
