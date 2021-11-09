import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'


Vue.use(VueRouter)
VueRouter.prototype.goBack = function () {

  this.isBack = true
  window.history.go(-1)
}
const router = new VueRouter({
  //mode: 'history',
  // base: '/monitor/',
  routes
})
// router.beforeEach((to, from, next) => {
//   if (to.meta.auth) {
//     if (localStorage.getItem('loginState')) {
//       next()
//     } else {
//       next({
//         path: '/login'
//       })
//     }
//   }else{
//     next()
//   }
//   /* 路由发生变化修改页面title */
// })
export default router
