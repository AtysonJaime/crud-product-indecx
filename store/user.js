export const state = () => ({
  session: [],
  usuario: [],
})

export const mutations = {
  UPDATE_USER(state, payload) {
    state.session = payload.session
    state.usuario = payload.user
  },
}

export const actions = {
  updateUser({ commit }, data) {
    commit('UPDATE_USER', data)
  },
}
