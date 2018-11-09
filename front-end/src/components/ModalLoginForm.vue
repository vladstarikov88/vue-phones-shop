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
                    type="email" 
                    placeholder="email"
                    class="input">
            </div>
            <div class="column">
                <input 
                    type="password" 
                    placeholder="password"
                    class="input">
            </div>
        </div>
        <div class="columns">
            <div class="column has-text-centered">
                <button class="button">Войти</button>
            </div>
        </div>
    </modal-window>
</template>
<script>
import ModalWindow from '@/components/ModalWindow'

export default {
    props: ["isOpen"],
    components: {
        ModalWindow
    },
    methods: {
        close() {
            this.$emit('close')
        }
    }    
}
</script>