<template>
    <modal-window v-on:close="close">
        <div class="columns">
            <div class="column has-text-centered">
                <h4 class="title is-4">Вход</h4>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <input 
                    type="username" 
                    placeholder="username"
                    class="input"
                    v-model="username"
                    @keyup.enter="authorization(username, password)">
                <p 
                    v-if="error_in_form"
                    class="help is-danger">Проверьте ваш логин или пароль</p>
            </div>
            <div class="column">
                <input 
                    type="password" 
                    placeholder="password"
                    class="input"
                    v-model="password"
                    @keyup.enter="authorization(username, password)">
            </div>
        </div>
        <div class="columns">
            <div class="column has-text-centered">
                <button class="button" @click="authorization(username, password)">Войти</button>
            </div>
        </div>
    </modal-window>
</template>
<script>
import { mapActions } from 'vuex'
import ModalWindow from './ModalWindow'

export default {
    props: ["isOpen"],
    data() {
        return {
            username: '',
            password: '',
            error_in_form: false
        }
    },
    components: {
        ModalWindow
    },
    methods: {
        ...mapActions('user', ['setAccessToken']),
        close() {
            this.$emit('close')
        },
        authorization(username, password) {
            this.axios
              .post("/login", {username, password})
              .then(response => {
                  this.error_in_form = false;
                  
                  const current_tocken = 'Bearer ' + response.data.access_token;
                  this.axios.defaults.headers.common['Authorization'] = current_tocken;

                  this.setAccessToken(current_tocken)
                  this.close()
              })
              .catch(e => {
                  this.error_in_form = true;
              })
        }
    }    
}
</script>