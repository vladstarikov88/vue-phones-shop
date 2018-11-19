<template>
    <div class="box">
        <article class="media">
            <div class="media-content">
                <div class="content">
                    <p><strong>{{address.username}}</strong></p>
                    <ul>
                        <li>{{address.address}}</li>
                        <li>{{address.email}}</li>
                    </ul>
                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-text">Редактировать</button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
export default {
    props: ['address']
}
</script>

<style lang="scss" scoped>
    .box{
        margin-right: 1em
    }
</style>
