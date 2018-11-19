<template>
    <section class="section">
        <div class="container flex">
            <h1 class="title">Оформить заказ</h1>
                <div v-if="getAccessTocken">
                    <div class="content">
                        <table class="table">
                            <tr>
                                <th>Адрес доставки: </th>
                                <th>Получатель</th>
                                <th>E-mail</th>
                            </tr>
                            <tr>
                                <td>{{address}}</td>
                                <td>{{username}}</td>
                                <td>{{email}}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-link">Подтвердить и оплатить</button>
                        </div>
                        <div class="control">
                            <button class="button is-text">Редактировать</button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="form">
                        <div class="field">
                            <div class="control">
                                <input class="input" type="text" placeholder="Имя">
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <input class="input" type="text" placeholder="Адрес доставки">
                            </div>
                        </div>
                        <div class="field">
                            <div class="control has-icons-right">
                                <input class="input" type="email" placeholder="Email">
                                <span class="icon is-small is-right">
                                    <i class="fas fa-exclamation-triangle"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field is-grouped">
                            <div class="control">
                                <button class="button is-link">Подтвердить и оплатить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </section>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            is_editing: false,
            address: "Ростов-на-Дону, ул. Красноармейская 210",
            username: "John Smith",
            email: "john@example.com"
        }
    },
    components: {
        
    },
    computed: {
        ...mapGetters('user', ['getAccessTocken']),
        ...mapGetters('user', ['user']),
    }
}
</script>

<style lang="scss" scoped>
    .title {
        text-align: center;
    }
    .form {
        margin: 0 25vw;
    }
</style>
