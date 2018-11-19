<template>
  <modal-window v-if="is_open" @close="reject">
    <div class="buttons">
        <button class="button" @click="resolve">Да</button>
        <button class="button" @click="reject">Нет</button>
    </div>
  </modal-window>
</template>
<script>
import ModalWindow from "@/components/modal/ModalWindow";
import bus from "./bus";

export default {
  name: "promise-dialog",
  components: {
    ModalWindow
  },
  created() {
    bus.$on('call-confirm-window', (resolve, reject)=>{
      this.resolve = this.closeWrapper(resolve);
      this.reject = this.closeWrapper(reject);
      this.openDialog();
    });
  },
  data() {
    return {
      resolve: null,
      reject: null,
      is_open: false
    };
  },
  beforeDestroy() {
    bus.$off('call-confirm-window', this.openDialog);
  },
  methods: {
    closeWrapper(func) {
      return () => {
        func();
        this.close();
      }
    },
    close() {
      this.is_open = false;
    },
    openDialog() {
      this.is_open = true;
    }
  }
};
</script>

