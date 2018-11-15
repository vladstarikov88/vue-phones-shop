<template>
    <tr>
        <td>
            <figure class="image is-64x64"><img :src="wish.image_url" alt=""></figure>
        </td>
        <td>{{wish.name}}</td>
        <td>{{wish.price}}</td>
        <td>{{wish.date}}</td>
    </tr>
</template>

<script>
export default {
    props: ["wish"],
    data() {
        return {
            
        }
    }
}
</script>

<style>

</style>
