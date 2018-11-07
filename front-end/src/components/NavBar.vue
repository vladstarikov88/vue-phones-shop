<template>
    <div>{{cart}}</div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("cart", ["cart"])
  }
};
</script>
