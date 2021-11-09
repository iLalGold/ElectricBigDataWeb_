import iView from 'view-design'
import axios from 'axios'
import qs from 'qs'
import { API_BASEURL, API_TIMEOUT } from '@/utils/config'
// import store from '@/store/modules/login'

// axios.interceptors.request.use(
//   config => {
//     // 判断是否存在token，如果存在的话，则每个http header都加上token
//     if (store.state.token) {
//       config.headers.Authorization = `${store.state.token}`
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

axios.interceptors.response.use(
  response => response,
  error => Promise.resolve(error.response)
)

function checkStatus(response = {}) {
  if (response.status === 200 || response.status === 304) {
    return response.data
  }
  if (response.data && response.data.errorMsg) {
    return {
      status: response.status,
      msg: response.data.errorMsg,
      data: response.data.errorMsg
    }
  }
  return {
    status: response.status,
    msg: response.statusText,
    data: response.statusText
  }
}

function checkResult(result) {
  if (result.status && result.status !== 0) {
    iView.LoadingBar.error()
    let msg = result.msg || '意外的处理结果'
    iView.Message.error({
      content: msg
    })
  } else {
    iView.LoadingBar.finish()
  }
  return result
}

export default {
  post(url, data) {
    iView.LoadingBar.start()
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data),
      timeout: API_TIMEOUT,
      baseURL: API_BASEURL,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
      .then(checkStatus)
      .then(checkResult)
  },
  postBody(url, data) {
    iView.LoadingBar.start()
    return axios({
      method: 'post',
      url,
      data,
      timeout: API_TIMEOUT,
      baseURL: API_BASEURL
    })
      .then(checkStatus)
      .then(checkResult)
  },
  get(url, params) {
    iView.LoadingBar.start()
    return axios({
      method: 'get',
      url,
      params,
      timeout: API_TIMEOUT,
      baseURL: API_BASEURL,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(checkStatus)
      .then(checkResult)
  }
}
