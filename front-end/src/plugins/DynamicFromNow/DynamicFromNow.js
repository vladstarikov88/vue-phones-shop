import moment from "@/plugins/moment";

export default {
  props: {
    tag: {
      type: String,
      default: 'span',
    },
    date: {
      default() {
        return moment()
      }
    }
  },
  data(){
    return {
      from_now: null,
    }
  },
  mounted() {
    this.updateFromNow()
    this.register()
  },
  beforeDestroy() {
    this.unregister()
  },
  methods: {
    register() {
      this.$registerMoment(this.updateFromNow);
    },
    unregister() {
      this.$unregisterMoment(this.updateFromNow)
    },
    updateFromNow() {
      this.from_now = moment(this.date).fromNow();
    },
  },
  render(h) {
    return h(this.tag, this.from_now)
  }
}