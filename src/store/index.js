import Vue from 'vue'
import Vuex from 'vuex'
import recommend from '../application/Recommend/store'
import singers from '../application/Singers/store'
import rank from '../application/Rank/store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    recommend,
    singers,
    rank
  }
})

export default store
