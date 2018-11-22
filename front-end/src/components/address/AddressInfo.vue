<template>
  <div class="box">
    <input type="radio" name="answer2">
    <div class="content">
      <p><strong>{{address.username}}</strong></p>
      <ul>
        <li>{{address.address}}</li>
        <li>{{address.email}}</li>
      </ul>
      <div class="field is-grouped">
        <div class="control">
          <button
            @click="$emit('edit')"
            class="button is-text">Редактировать
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['address'],
  }
</script>

<style lang="scss" scoped>
  .box {
    margin-right: 1em
  }
</style>
