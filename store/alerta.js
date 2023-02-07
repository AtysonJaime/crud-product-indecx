export const state = () => ({
  alertaPopUp: {
    info: '',
    show: false,
    icon: '',
    error: false,
  },
})
export const mutations = {
  SHOW_ALERTA(state, payload) {
    state.alertaPopUp.info = payload.info
    state.alertaPopUp.show = payload.show
    state.alertaPopUp.icon = payload.icon
    state.alertaPopUp.error = payload.error
  },
  CLOSE_ALERTA(state, payload) {
    state.alertaPopUp.show = payload
    state.alertaPopUp.info = ''
    state.alertaPopUp.icon = ''
    state.alertaPopUp.error = false
  },
}

export const actions = {
  showAlerta({ commit }, infos) {
    commit('SHOW_ALERTA', infos)

    setTimeout(() => {
      commit('CLOSE_ALERTA', false)
    }, 5000)
  },
  closeAlerta({ commit }) {
    commit('CLOSE_ALERTA', false)
  },
}
