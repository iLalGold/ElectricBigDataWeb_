/**
 * login module
 */
import { getToken, setToken, removeToken } from '@/utils/authService'
import { LoginStatus } from '@/utils/dataService'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT = 'LOGOUT'

export default {
  state: {
    user: null,
    token: getToken() || null
  },
  mutations: {
    [LOGIN_SUCCESS](state, data) {
      setToken(data.token)
      state.token = data.token
      state.user = data
      sessionStorage.user = JSON.stringify(data)
    },
    [LOGOUT](state) {
      removeToken()
      state.token = getToken() || null
      state.user = null
      sessionStorage.clear()
    }
  },
  actions: {
    loginSuccess({ commit }, data) {
      commit(LOGIN_SUCCESS, data)
    },
    logout({ commit }) {
      commit(LOGOUT)
    }
  },
}
