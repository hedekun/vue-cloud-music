import Vue from 'vue'
import Vuex from 'vuex'
import recommend from '../application/Recommend/store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    recommend
  }
})

export default store
