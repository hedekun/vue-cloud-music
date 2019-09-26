import {getBannerRequest, getRecommendListRequest} from '../../../api/request'

const state = {
  bannerList: [],
  recommendList: [],
  enterLoading: true
}

const mutations = {
  CHANGE_BANNER: (state, data) => {
    state.bannerList = data
  },
  CHANGE_RECOMMEND_LIST: (state, data) => {
    state.recommendList = data
  },
  CHANGE_ENTER_LOADING: (state, data) => {
    state.enterLoading = data
  }
}

const actions = {
  changeBanner({commit}) {
    getBannerRequest().then(data => {
      commit('CHANGE_BANNER', data.banners)
    }).catch(() => {
    })
  },
  changeRecommendList({commit, dispatch}) {
    getRecommendListRequest().then(data => {
      commit('CHANGE_RECOMMEND_LIST', data.result)
      dispatch('changeEnterLoading')
    }).catch(() => {
    })
  },
  changeEnterLoading({commit}, loading) {
    commit('CHANGE_ENTER_LOADING', loading)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
