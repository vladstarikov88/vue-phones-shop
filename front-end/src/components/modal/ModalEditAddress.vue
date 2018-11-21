<template>
  <modal-window
    @close="$emit('close')">
    <address-form
      :id="id"
      title="Редактирование адреса"
      @cancel="$emit('close')"
      @save-form="$emit('save-form', $event)">
    </address-form>
  </modal-window>
</template>

<script>
  import ModalWindow from '@/components/modal/ModalWindow'
  import AddressForm from '@/components/address/AddressForm'
  export default {
    props:['id'],
    components: {
      AddressForm,
      ModalWindow,
    },
    methods: {

    },
    name: "ModalEditAddress"
  }
</script>

<style scoped>

</style>