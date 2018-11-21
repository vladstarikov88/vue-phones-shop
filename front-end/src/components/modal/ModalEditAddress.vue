<template>
  <modal-window
    @close="$emit('close')">
    <address-form
      :id="id"
      title="Редактирование адреса"
      @save-form="saveAddress">
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
      saveAddress() {

      }
    },
    name: "ModalEditAddress"
  }
</script>

<style scoped>

</style>