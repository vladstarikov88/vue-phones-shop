<template>

<td class="amount">
    <span v-if="isEditing">
        <div class="field has-addons">
            <p class="control">
              <input  
                type="number"
                class="input"
                v-model="model"
                v-validate="'between:1,9999'" 
                :class="{'is-danger' : errors.has('between_field')}"
                name="between_field">
            </p>
            <p class="control">
              <button
                class="button"
                @click="$emit('edit', model)"
                :disabled="errors.has('between_field')">
                <i class="fas fa-check"></i>
              </button>
            </p>
            <p class="control">
              <button 
                class="button"
                @click="$emit('cancel')">
                <i class="fas fa-times"></i>
              </button>
            </p>
        </div>
    </span>
    <span
      class="btn-behavior" 
      @click="$emit('edit-info', model)"
      v-else>x {{amount}} шт.</span>
</td>

</template>

<script lang="js">
  export default  {
    name: 'editable-cell',
    props: ['isEditing', 'amount'],
    data() {
      return {
        model: null,
      }
    },
    watch: {
      isEditing: {
        deep: true,
        handler() {
          this.model = this.amount;
        }
      }
    }
}
</script>

<style scoped lang="scss">
 .amount {
  width: 12em;
  .control {
    .input {
      width: 4em;
    }
  }
}
tr {
  td {
    .buttons {
      width: 20em;
    }
    vertical-align: middle !important;
    img {
      max-height: unset;
    }
  }
}
</style>
