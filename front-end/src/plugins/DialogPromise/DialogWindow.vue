<template>
  <div class="modal" :class="{'is-active': is_open}">
    <div class="modal-background" @click.self="wrappedReject"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Подтверждение</p>
        <button class="delete" aria-label="close" @click="wrappedReject"></button>
      </header>
      <section class="modal-card-body">
        <div class="content">
          <p class="title is-3">{{message}}</p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="wrappedResolve">{{accept_label}}</button>
        <button class="button" @click="wrappedReject">{{cancel_label}}</button>
      </footer>
    </div>
  </div>
</template>
<script>
import bus from "./bus";

export default {
  name: "promise-dialog",
  created() {
    bus.$on('call-confirm-window', this.confirm);
  },
  data() {
    return {
      resolve: null,
      reject: null,
      message: '',
      accept_label: '',
      cancel_label: '',
      is_open: false
    };
  },
  beforeDestroy() {
    bus.$off('call-confirm-window', this.openDialog);
  },
  methods: {
    confirm(resolve, reject, message, accept_label, cancel_label) {
      this.resolve = resolve;
      this.reject = reject;
      this.message = message;
      this.accept_label = accept_label;
      this.cancel_label = cancel_label;
      this.openDialog();
    },
    wrappedReject(){
      this.reject();
      this.close();
    },
    wrappedResolve(){
      this.resolve();
      this.close();
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

