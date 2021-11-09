// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import i18n from '@/locale'
import viewdesign from "view-design"
import './assets/style.less'
import moment from 'moment'

Vue.prototype.$moment = moment;
Vue.config.productionTip = false
Vue.use(viewdesign, {
    i18n: (key, value) => i18n.t(key, value)
})
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: { App },
    template: '<App/>'
})
