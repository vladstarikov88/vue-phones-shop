<template>
  <div class="box" @click="$emit('select')">
    <input type="radio" :checked="isSelected" @change="$emit('select')">
    <div class="content">
      <p><strong>{{address.username}}</strong></p>
      <ul>
        <li>{{address.address}}</li>
        <li>{{address.email}}</li>
      </ul>
      <div class="field is-grouped">
        <div class="control">
          <button
            @click.stop="$emit('edit')"
            class="button is-text">Редактировать
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['address', 'is-selected'],
  }
</script>

<style lang="scss" scoped>
  .box {
    margin-right: 1em
  }
</style>
