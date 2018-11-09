<template>
    <modal-window
        :is-open="isOpen"
        v-on:close="close">
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
                    v-model="username">
            </div>
            <div class="column">
                <input 
                    type="password" 
                    placeholder="password"
                    class="input"
                    v-model="password">
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
import ModalWindow from '@/components/ModalWindow'

export default {
    props: ["isOpen"],
    data() {
        return {
            username: '',
            password: ''
        }
    },
    components: {
        ModalWindow
    },
    methods: {
        close() {
            this.$emit('close')
        },
        authorization(username, password) {
            this.axios
              .post("/login", {username, password})
              .then( response => {
                  console.log(response)
              } )
              .catch( error => {
                  console.log(error)
              })
        }
    }    
}
</script>