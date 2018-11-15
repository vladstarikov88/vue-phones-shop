<template>
  <modal-window @close="close">
    <h4 class="title is-4 has-text-centered">Вход</h4>
    <div class="field">
      <p class="control has-icons-left">  
        <input 
          type="username" 
          placeholder="username"
          class="input"
          v-model="username"
          @keyup.enter="authorization">
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">  
        <input 
          type="password" 
          placeholder="password"
          class="input"
          v-model="password"
          @keyup.enter="authorization">  
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
      </p>
    </div>
    <button class="button is-success" @click="authorization(username, password)">Войти</button>
  </modal-window>
</template>
<script>
import { mapActions } from 'vuex'
import ModalWindow from './ModalWindow'

export default {
  props: ["isOpen"],
  data() {
    return {
      username: "",
      password: "",
     
    };
  },
  components: {
    ModalWindow
  },
  methods: {
    ...mapActions("user", ["setAccessToken"]),
    close() {
      this.$emit("close");
    },
    authorization() {
      this.axios
        .post("/login", { 
          username: this.username, 
          password: this.password 
          })
        .then(response => {
          const current_token = "Bearer " + response.data.access_token;
          this.axios.defaults.headers.common["Authorization"] = current_token;
          this.setAccessToken(current_token);
          this.close();
        })
        .catch(() => {
          this.$notify({
            message: 'Неверный логин или пароль',
            status: 'danger',
          });
          this.username = "";
          this.password = "";
        });
    }
  }
};
</script>