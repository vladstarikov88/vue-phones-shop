<template>
    <div class="field">
    <label class="label">{{ title }}</label>
    <div class="control">
        <input class="input" v-model="phone.name">
    </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        phone: {
            type: Object,
            required: true
        }
    }

}
</script>

<style>

</style>
