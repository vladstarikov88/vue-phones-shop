<template>
    <modal-window 
        :is-open="isOpen"
        v-on:close="close">
        <div class="columns">
            <div class="column has-text-centered">
                <h4 class="title is-4">Добавить в корзину</h4>
            </div>
        </div>
        <div class="columns">
            <div class="column is-two-trird">
                <img>
                <figure class="image">
                    <img :src="phone.image_url" alt="">
                </figure>
            </div>
            <!-- <p class="title is-6">{{ phone.name }}</p> -->
            <div class="column">
                <p class="title is-6">Кол-во:</p>
                <p class="title is-6">Цена:</p>
                <p class="title is-6">Сумма:</p>
            </div>
            <div class="column">
                <input type="number" class="input" v-model.number="current_amount">
                <p class="title is-6">{{ phone.price }}</p>
                <p class="title is-6">{{ countPrice || phone.price}}</p>
            </div>
        </div>
        <div class="columns">
            <div class="column has-text-centered ">
                <button class="button" @click="addToCartById([phone.id, current_amount])">Добавить</button>
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
            current_amount: 1
        }
    },
    components: {
        ModalWindow
    },
    computed: {
        countPrice() {
            return this.phone.price * this.current_amount
        }
    },
    methods: {
        ...mapActions('cart', ['addToCartById', 'removeFromCartById']),
        close() {
            this.$emit('close')
        }
    }
}
</script>
