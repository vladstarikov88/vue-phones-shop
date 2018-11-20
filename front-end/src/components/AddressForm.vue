<template>
    <div class="form">
        <div class="field">
            <div class="control has-icons-right">
                <input 
                    class="input" 
                    type="text" 
                    placeholder="Имя адресата"
                    v-model="form.username"
                    v-validate="'required|min:8'" 
                    name="min_field"
                    :class="{'is-danger' : errors.has('min_field')}">
                <span class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
                <p
                    class="help is-danger"
                    v-if="errors.has('min_field')">
                    Длина имени должна быть не менее 8 символов</p>
            </div>
        </div>
        <div class="field">
            <div class="control has-icons-right">
                <input 
                    class="input" 
                    type="text" 
                    placeholder="Адрес доставки"
                    v-model="form.address"
                    v-validate="'required'"
                    name="address"
                    :class="{'is-danger' : errors.has('address')}">
                <span class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
                <p
                    class="help is-danger"
                    v-if="errors.has('address')">
                    Поле является обязательным</p>
            </div>
        </div>
        <div class="field">
            <div class="control has-icons-right">
                <input 
                    class="input" 
                    type="email" 
                    placeholder="Email"
                    v-model="form.email"
                    v-validate="'required|email'" 
                    name="email_field"
                    :class="{'is-danger' : errors.has('email_field')}">
                <span class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
                <p 
                    class="help is-danger" 
                    v-if="errors.has('email_field')">
                    Неверный формат</p>
            </div>
        </div>
        
        
        <div class="field is-grouped">
            <div class="control">
                <slot 
                    name="submit" 
                    :check-form="checkForm">
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['form'],
    methods: {
        checkForm() {
            console.log(this.form)
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.$emit('send-form', this.form)
                    this.$notify({
                        message: "Заявка успешно отправлена",
                        status: "info"
                    });
                }
            });
        }
    }
}
</script>

<style>

</style>
