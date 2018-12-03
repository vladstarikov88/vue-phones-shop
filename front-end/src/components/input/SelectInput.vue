<template>
    <div class="field">
        <label class="label">{{ title }}</label>
        <div class="control">
          <div class="select">
            <select 
                v-bind:category_name="category_name"
                v-on:change="$emit('change', $event.target.value)">
                <option 
                    v-for="option in options" 
                    :key="option.id" 
                    :value="option.value">{{option.title}}</option> 
            </select>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    model: {
        prop: "category_name",
        event: 'change'
    },
    props: {
        title: {
            type: String,
            required: true
        },
        category_name: {
            required: true
        }
    },
    data() {
        return {
            options: [
                {
                    title: 'iPhone',
                    value: 'iphone'
                },
                {
                    title: 'Нормальные телефоны',
                    value: 'others'
                }
            ]
        }
    },
    computed: {
        category() {return this.model_prop}
    },
    methods: {
        changeValue(e) {
            console.log(e.target.value)
        }
    }
}
</script>

<style>

</style>
