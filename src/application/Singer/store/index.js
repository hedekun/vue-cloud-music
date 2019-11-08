import {getSingerInfoRequest} from '../../../api/request'

const state = {
  artist: {},
  songsOfArtist: [],
  loading: true
}

const mutations = {
  CHANGE_ARTIST: (state, data) => {
    state.artist = data
  },
  CHANGE_SONGS_OF_ARTIST: (state, data) => {
    state.songsOfArtist = data
  },
  CHANGE_ENTER_LOADING: (state, data) => {
    state.loading = data
  }
}

const actions = {
  getSingerInfo({commit}, id) {
    getSingerInfoRequest(id).then(res => {
      commit('CHANGE_ARTIST', res.artist)
      commit('CHANGE_SONGS_OF_ARTIST', res.hotSongs)
      commit('CHANGE_ENTER_LOADING', false)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
