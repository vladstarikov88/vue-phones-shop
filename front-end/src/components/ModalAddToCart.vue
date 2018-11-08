<template>
    <modal-window 
        :is-open="isOpen"
        v-on:close="close">
        <div>
            <button class="button" @click="addToCartById([2, 1])">Добавить товар в корзину</button>
            <div>
            <p>{{ phone.id }}</p>
            <p>{{ phone.name }}</p>
            <p>Сумма: {{ phone.price }}</p>
            </div>
        </div>
    </modal-window>
</template>
<script>
import ModalWindow from '@/components/ModalWindow'
import {mapActions} from 'vuex'
export default {
    props: ["isOpen", "phone"],
    data() {
        return {

        }
    },
    components: {
        ModalWindow
    },
    methods: {
        ...mapActions('cart', ['addToCartById']),
        close() {
            this.$emit('close')
        }
    }
}
</script>
