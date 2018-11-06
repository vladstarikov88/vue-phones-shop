const user = {
  state: {
    access_token: null
  },
  mutations: {
    setAccessToken(state, access_token) {
      state.access_token = access_token
    }
  },
  actions: {
    setAccessToken({commit}, access_token) {
      commit('setAccessToken', access_token)
    }
  }
}

export default user