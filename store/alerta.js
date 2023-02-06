export const state = () => ({
  alertaInterno: {
    info: '',
    show: false,
    icon: '',
    error: false,
  },
})
export const mutations = {
  SHOW_ALERTA_INTERNO(state, payload) {
    state.alertaInterno.info = payload.info
    state.alertaInterno.show = payload.show
    state.alertaInterno.icon = payload.icon
    state.alertaInterno.error = payload.error
  },
  CLOSE_ALERTA_INTERNO(state, payload) {
    state.alertaInterno.show = payload
    state.alertaInterno.info = ''
    state.alertaInterno.icon = ''
    state.alertaInterno.error = false
  },
}

export const actions = {
  showAlertaInterno({ commit }, infos) {
    commit('SHOW_ALERTA_INTERNO', infos)
  },
  closeAlertaInterno({ commit }) {
    commit('CLOSE_ALERTA_INTERNO', false)
  },
}
