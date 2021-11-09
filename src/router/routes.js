const layouts = [
  {
    path: '/',
    component: resolve => {
      require(['@/views/test.vue'], resolve)
    },
    children: [
      {
        path: '',
        name: 'overview',
        meta: {
          title: '概览',
          auth: true,
          routerSort: 0
        },
        component: resolve => {
          require(['@/views/overview/home.vue'], resolve)
        }
      },
      {
        path: '/transformer',
        name: 'transformer',
        meta: {
          title: '变压器',
          auth: true,
          routerSort: 1
        },
        component: resolve => {
          require(['@/views/transformer/index.vue'], resolve)
        }
      },
      {
        path: '/line',
        name: 'line',
        meta: {
          title: '线路',
          auth: true,
          routerSort: 2
        },
        component: resolve => {
          require(['@/views/line/index.vue'], resolve)
        }
      },
      {
        path: '/management',
        name: 'management',
        meta: {
          title: '台区电压精细化管理',
          auth: true,
          routerSort: 3
        },
        component: resolve => {
          require(['@/views/management/index.vue'], resolve)
        }
      },
      {
        path: '/voltage',
        meta: {
          title: '台区首末端电压',
          auth: true,
          routerSort: 4
        },
        component: resolve => {
          require(['@/views/voltage/index.vue'], resolve)
        }
      },
      {
        path: '/community',
        meta: {
          title: '小区用电评估',
          auth: true,
          routerSort: 5
        },
        component: resolve => {
          require(['@/views/community/index.vue'], resolve)
        }
      }
    ]
  }
]
const routes = [...layouts]
export default routes
