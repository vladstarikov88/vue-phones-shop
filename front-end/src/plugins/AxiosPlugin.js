import axios from 'axios'

export default {
    install(Vue, options) {
        axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
        
        const current_tocken = options.store.state.user.access_token;
        if(current_tocken !== null) {
            axios.defaults.headers.common['Authorization'] = current_tocken;
        }
        Vue.set(Vue.prototype, 'axios', axios)
    }
}