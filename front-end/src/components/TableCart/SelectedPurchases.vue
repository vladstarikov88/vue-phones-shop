<template>  
    <table class="table is-fullwidth">
        <tr>
            <th>Миниатюра</th>
            <th>Модель</th>
            <th>Колличество</th>
        </tr>
        <tr v-for="purchase in purchases" :key="purchase.id">
            <td>
                <figure class="image is-64x64"><img :src="purchase.image_url" alt=""></figure>
            </td>
            <td>{{purchase.name}}</td>
            <td>{{purchase.amount}}</td>
        </tr>
    </table>
</template>

<script>
export default {
    props: ['purchases']
}
</script>