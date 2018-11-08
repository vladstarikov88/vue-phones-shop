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
            
            <div class="column content">
                <p class="title is-6">{{ phone.name }}</p>
                <table class="table is-fullwidth">
                    <tr>
                        <td>Кол-во</td>
                        <td><input type="number" class="input" v-model.number="current_amount"></td>
                    </tr>
                    <tr>
                        <td>Цена:</td>
                        <td> {{ phone.price }} руб.</td>
                    </tr>
                    <tr>
                        <td>Сумма:</td>
                        <td>{{ total_price}} руб.</td>
                    </tr>
                </table>
                
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
        total_price() {
            return this.phone.price * (this.current_amount || 1)
        }
    },
    methods: {
        ...mapActions('cart', ['addToCartById']),
        close() {
            this.$emit('close')
        }
    }
}
</script>
<style lang="scss" scoped>
.table {
    td {
        vertical-align: middle !important;
        &:nth-child(2) {
            text-align: right;
        }
    }
}
</style>
