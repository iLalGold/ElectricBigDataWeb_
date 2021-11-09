/**
 * Created by superman on 17/2/16.
 * http配置
 */
import axios from 'axios'
import store from '@/store/module/login'
import iView, { Message } from 'view-design'
import { API_BASEURL, API_TIMEOUT } from '@/utils/config'
import router from '@/router'
// axios 配置
axios.defaults.withCredentials = true
axios.defaults.timeout = API_TIMEOUT
// axios.defaults.headers.common['Authorization'] = 'token'
// axios.defaults.headers.post['Content-Type']  = "application/json"
axios.defaults.headers.post['Content-Type'] =
    // 'text/plain;charset=UTF-8'
    'multipart/form-data'
// 'application/x-www-form-urlencoded'
// var csrftoken = window.document.cookie.get('csrftoken')
// axios.defaults.headers.common['HTTP_X_CSRFTOKEN'] = csrftoken
// http request 拦截器
axios.interceptors.request.use(config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (store.state.token) {
        config.headers.Authorization = `${store.state.token}`
    }
    return config
}, err => {
    Message.error('加载超时！')
    return Promise.reject(err)
})
// http response 拦截器
axios.interceptors.response.use(response => {
    iView.LoadingBar.finish()
    //return response
    let badRequest = false
    if (response.data) {
        // if (!response.data.status) {
        //     switch (response.data.code) {
        //         case 2000:
        //             window.localStorage.removeItem("currentUserMenu");
        //             window.localStorage.removeItem("currentUserDepartments");
        //             window.localStorage.removeItem("loginUser");
        //             //返回 2000 清除token信息并跳转到登录页面
        //             response.message = '未认证，请登录！'
        //             //store.commit(store.LOGOUT_USER)
        //             if (router.currentRoute.path != '/') {
        //                 router.replace({
        //                     path: '/login',
        //                     query: {
        //                         redirect: router.currentRoute.fullPath
        //                     }
        //                 })
        //             }
        //             break
        //     }
        // }
    }
    if (!badRequest) return response
    else {
        return Promise.reject(response)
    }
}, error => {
    if (error.response) {
        iView.LoadingBar.finish()
        switch (error.response.status) {
            case 401:
                // 返回 401 清除token信息并跳转到登录页面
                error.message = '未授权，请重新登录(401)'
                //store.commit(store.LOGOUT_USER)
                // window.localStorage.removeItem("currentUserMenu");
                // window.localStorage.removeItem("currentUserPrisonareas");
                // window.localStorage.removeItem("loginUser");
                // if (router.currentRoute.path != '/login') {
                //     router.replace({
                //         path: '/login',
                //         query: {
                //             redirect: router.currentRoute.fullPath
                //         }
                //     })
                // }
                break
            case 400:
                error.message = '请求错误(400)'
                break
            case 403:
                error.message = '拒绝访问(403)'
                break
            case 404:
                error.message = process.env.NODE_ENV === 'production' ? `请求地址出错(404)` : `请求地址出错(404): ${error.response.config.url}`
                break
            case 408:
                error.message = '请求超时(408)'
                break
            case 500:
                error.message = '服务器错误(500)'
                break
            case 501:
                error.message = '服务未实现(501)'
                break
            case 502:
                error.message = '网络错误(502)'
                window.localStorage.removeItem("currentUserMenu");
                window.localStorage.removeItem("currentUserPrisonareas");
                window.localStorage.removeItem("loginUser");
                if (router.currentRoute.path != '/login') {
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    })
                }
                break
            case 503:
                error.message = '服务不可用(503)'
                break
            case 504:
                error.message = '网络超时(504)'
                window.localStorage.removeItem("currentUserMenu");
                window.localStorage.removeItem("currentUserPrisonareas");
                window.localStorage.removeItem("loginUser");
                if (router.currentRoute.path != '/login') {
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    })
                }
                break
            case 505:
                error.message = 'HTTP版本不受支持'
                break
        }
    }
    if (error.response.data && error.response.data.errorMsg) {
        Message.error({
            content: error.response.data.errorMsg,
            duration: 5
        })
    } else if (error.message) {
        Message.error({
            content: error.message,
            duration: 5
        })
    }
    // 返回接口返回的错误信息
    return Promise.reject(error.response)
})
export default axios
