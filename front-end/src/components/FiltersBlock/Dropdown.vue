<template>
<div class="control">
<div class="dropdown" :class="{'is-active': is_active}">
    <div class="dropdown-trigger">
      <button @click="toggleActive" class="button">
        <span>{{header}}</span>
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a href="#" class="dropdown-item" v-if="default_option">
          {{default_option.title}}
        </a>
        <hr class="dropdown-divider">
        <template v-if="options.length" v-for="option in options_without_default">
          <a href="#" class="dropdown-item" :key="option.key">
            {{option.title}}
          </a>
        </template>
      </div>
    </div>
  </div>
</div>
  


</template>

<script>
export default {
  name: "dropdown",
  props: ["options", "value", "placeholder"],
  mounted() {
    this.default_option = this.lodash.find(this.options, { value: this.value });
  },
  data() {
    return {
      is_active: false,
      default_option: null
    };
  },
  methods: {
    toggleActive() {
      this.is_active = !this.is_active;
    }
  },
  computed: {
    header() {
      return this.active_option ? this.active_option.title : this.placeholder;
    },
    active_option() {
      return this.lodash.find(this.options, { value: this.value });
    },
    options_without_default() {
      if (this.default_option) {
        return this.lodash.filter(this.options, ({ value }) => {
          return value !== this.default_option.value;
        });
      } else {
        return this.options
      }
    }
  }
};
</script>

<style scoped lang="scss">
.dropdown {
}
</style>
