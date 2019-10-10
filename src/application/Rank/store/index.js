import {getRankListRequest} from "../../../api/request"

const state = {
  rankList: [],
  loading: true
}

const mutations = {
  CHANGE_RANK_LIST: (state, data) => {
    state.rankList = data
  },
  CHANGE_LOADING: (state, data) => {
    state.loading = data
  }
}

const actions = {
  getRankList({commit}) {
    getRankListRequest().then(data => {
      const list = data && data.list
      commit('CHANGE_RANK_LIST', list)
      commit('CHANGE_LOADING', false)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
