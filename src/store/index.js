import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      id: null,
      nickname: null,
      sex: null,
      email: null
    },
    accessToken: null,
    doubanTop24: []
  },
  mutations: {
    upUser(state, user) {
      state.user.id = user.id
      state.user.nickname = user.nickname
      state.user.sex = user.sex
      state.user.email = user.email
    },
    upAccessToken(state, token) {
      state.accessToken = token
    },
    upDoubanTop24(state, doubanTop24) {
      state.doubanTop24 = doubanTop24
    },
  }
})
