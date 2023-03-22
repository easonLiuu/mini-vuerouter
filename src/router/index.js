import Vue from 'vue'
import VueRouter from '@/vue-router'
import HomeView from '../views/HomeView.vue'

//Vue.use 里面是函数 默认执行
Vue.use(VueRouter) //调用插件的install方法

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'a',
        component: {
          render: (h)=><h1>a</h1>
        }
      },
      {
        path: 'b',
        component: {
          render: (h)=><h1>b</h1>
        }
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})
// 哈希模式
//根据哈希值的不同可以渲染不同的组件 可以通过window.addeventlistener('popstate')监控到哈希值的变化
//问题 丑 服务端无法获取锚点 服务端无法根据路径解析内容 无法实现seo优化

// history模式 H5提供的 可以改变路径 同时强制刷新时会带上路径 服务端解析路径 因此可用于服务端渲染和seo优化 需要服务端支持
// 后续页面基于historyapi即可
router.matcher.addRoutes([
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'c',
        component: {
          render: (h)=><h1>c</h1>
        }
      }
    ]
  }
])

//导航守卫 一个路由切换到另一个理由时会发生什么
//组件要先离开 beforeRouteLeave
//切换到新的组件里 beforeEach 进入到某个页面

//组件更新呢 beforeRouteUpdate
//不是更新 走路由中配置的钩子 beforeEnter
//走组件的钩子  beforeRouteEnter
//确认切换完毕
//beforeResolve
//都走完了 afterEach

export default router
