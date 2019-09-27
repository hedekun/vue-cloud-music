import Vue from 'vue'
import Vuex from 'vuex'
import recommend from '../application/Recommend/store'
import singers from '../application/Singers/store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    recommend,
    singers
  }
})

export default store
