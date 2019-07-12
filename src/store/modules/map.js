const state = {
  uwi: ''
}

const mutations = {
  SET_UWI: (state, uwi) => {
    state.uwi = uwi
  }
}

const actions = {
  changeUWI({ commit }, data) {
    commit('SET_UWI', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
