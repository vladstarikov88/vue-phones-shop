<template>
    <section class="section">
        <div class="container flex">
            <h1 class="title">Ваш заказ</h1>
            <p>Тут будет выводиться таблица из корзины</p>
        </div>
        <div class="container flex">
            <form class="form">
                <h1 class="title">Оформить заказ</h1>
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
                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link">Submit</button>
                    </div>
                    <div class="control">
                        <button class="button is-text">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .title {
        text-align: center;
    }
    .form {
        padding: 0 25vw;
    }
</style>
