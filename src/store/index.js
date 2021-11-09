import Vue from 'vue'
import Vuex from 'vuex'

// import user from './module/user'
// import app from './module/app'
import mapData from './module/map-data'

Vue.use(Vuex)

export default new Vuex.Store({
  //加载动画
  state: {
    isLoading: false //加载状态
  },
  getters: {
    md: state => state.mapData.mapData
  },
  mutations: {
    //加载的状态
    updateLoadingStatus(state, isLoading) {
      state.isLoading = isLoading
    }
  },
  actions: {
    //
  },
  modules: {
    // user,
    // app
    mapData
  }
})
