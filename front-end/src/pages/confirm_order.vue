<template>
    <section class="section">
        <div class="container flex">
            <h1 class="title">Оформить заказ</h1>
                <div v-if="getAccessTocken">
                    <div class="box">
                        <article class="media">
                            <div class="media-left">
                            <figure class="image is-96x96">
                                <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                            </figure>
                            </div>
                            <div class="media-content">
                                <div class="content">
                                    <p><strong>John Smith</strong> <small>@example.com</small></p>
                                    <table class="table">
                                        <tr>
                                            <th>Адрес доставки: </th>
                                            <th>Номер телефона</th>
                                            <th>Редактировать</th>
                                        </tr>
                                        <tr>
                                            <td>Ростов-на-Дону, ул. Красноармейская 210</td>
                                            <td>+7(918) 321-45-71</td>
                                            <td>
                                                <div class="buttons">
                                                    <a class="button is-warning"
                                                    @click="editInfoInRow(purchase.id)">
                                                    <span class="icon is-small">
                                                        <i class="fa-edit" :class="[ is_editing ? 'fas': 'far']"></i>
                                                    </span>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </article>
                    </div>
                    <a href="" class="button is-link">Подтвердить и оплатить</a>
                </div>
                <div v-else>
                    <div class="form">
                        <div class="field">
                            <div class="control">
                                <input class="input" type="text" placeholder="Имя">
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
                        <div class="field">
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
            is_editing: false
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
