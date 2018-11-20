
export default {
    beforeCreate() {
        const needConfirmationMethods = this.$options.needConfirmationMethods || {};
        if (!Object.keys(needConfirmationMethods).length) return
        for (let method_name in needConfirmationMethods) {
            const method = needConfirmationMethods[method_name]
            if(typeof method === 'object') {
                this.$options.methods[method_name] = this.$wrapperConfirmPromise(method)
            } else {
                this.$options.methods[method_name] = this.$wrapperConfirmPromise(method)

            }
        }
    }
}
