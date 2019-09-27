import {getHotSingerListRequest, getSingerListRequest} from '../../../api/request'

const state = {
  singerList: [],
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false,
  pageCount: 0
}

const mutations = {
  CHANGE_SINGER_LIST: (state, data) => {
    state.singerList = data
  },
  CHANGE_ENTER_LOADING: (state, data) => {
    state.enterLoading = data
  },
  CHANGE_PULL_UP_LOADING: (state, data) => {
    state.pullUpLoading = data
  },
  CHANGE_PULL_DOWN_LOADING: (state, data) => {
    state.pullDownLoading = data
  },
  CHANGE_PAGE_COUNT: (state, data) => {
    state.pageCount = data
  }
}

const actions = {
  getHotSingerList: ({commit}) => {
    getHotSingerListRequest(0).then(res => {
      const data = res.artists
      commit('CHANGE_SINGER_LIST', data)
      commit('CHANGE_ENTER_LOADING', false)
      commit('CHANGE_PULL_DOWN_LOADING', false)
    })
  },
  getSingerList: ({commit}, {category, alpha}) => {
    getSingerListRequest(category, alpha, 0).then(res => {
      const data = res.artists
      commit('CHANGE_SINGER_LIST', data)
      commit('CHANGE_ENTER_LOADING', false)
      commit('CHANGE_PULL_UP_LOADING', false)
      commit('CHANGE_PULL_DOWN_LOADING', false)
    }).catch()
  },
  refreshMoreHotSingerList: ({commit, state}) => {
    getHotSingerListRequest(state.pageCount).then(res => {
      const data = [...state.singerList, ...res.artists]
      commit('CHANGE_SINGER_LIST', data)
      commit('CHANGE_PULL_UP_LOADING', false)
    })
  },
  refreshMoreSingerList: ({commit, state}, {category, alpha}) => {
    getSingerListRequest(category, alpha, state.pageCount).then(res => {
      const data = [...state.singerList, ...res.artists]
      commit('CHANGE_SINGER_LIST', data)
      commit('CHANGE_ENTER_LOADING', false)
      commit('CHANGE_PULL_UP_LOADING', false)
    })
  },
  pullUpRefresh: ({commit, dispatch, state}, {hot, category, alpha}) => {
    console.log('chufa')
    commit('CHANGE_PULL_UP_LOADING', true)
    commit('CHANGE_PAGE_COUNT', state.pageCount + 1)
    if (hot) {
      dispatch('refreshMoreHotSingerList')
    } else {
      dispatch('refreshMoreSingerList', {category, alpha})
    }
  },
  pullDownRefresh: ({commit, dispatch}, {category, alpha}) => {
    commit('CHANGE_PULL_DOWN_LOADING', true)
    commit('CHANGE_PAGE_COUNT', 0)
    if (category === '' && alpha === '') {
      dispatch('getHotSingerList')
    } else {
      dispatch('getSingerList', {category, alpha})
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
