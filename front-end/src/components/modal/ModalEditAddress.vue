<template>
  <modal-window
    @close="$emit('close')">
    <address-form
      :address="address"
      @cancel="$emit('close')"
      @save-form="$emit('save-form', $event)"
      title="Редактирование адреса">
    </address-form>
  </modal-window>
</template>

<script>
  import ModalWindow from '@/components/modal/ModalWindow'
  import AddressForm from '@/components/address/AddressForm'

  export default {
    props:['address'],
    components: {
      AddressForm,
      ModalWindow,
    },
    name: "ModalEditAddress"
  }
</script>

<style scoped>

</style>