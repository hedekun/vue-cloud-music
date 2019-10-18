import {getAlbumDetailRequest} from '../../../api/request'

const state = {
  currentAlbum: {},
  enterLoading: false
}

const mutations = {
  CHANGE_CURRENT_ALBUM: (state, data) => {
    state.currentAlbum = data
  },
  CHANGE_ENTER_LOADING: (state, data) => {
    state.enterLoading = data
  }
}

const actions = {
  changeEnterLoading({commit}, loading) {
    commit('CHANGE_ENTER_LOADING', loading)
  },
  getAlbumList({commit}, id) {
    getAlbumDetailRequest(id).then(res => {
      commit('CHANGE_CURRENT_ALBUM', res.playlist)
      commit('CHANGE_ENTER_LOADING', false)
    }).catch(() => {
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
