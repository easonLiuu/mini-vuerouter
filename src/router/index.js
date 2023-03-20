import Vue from 'vue'
import VueRouter from '@/vue-router'
import HomeView from '../views/HomeView.vue'

//Vue.use 里面是函数 默认执行
Vue.use(VueRouter) //调用插件的install方法

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
  routes
})
// 哈希模式
//根据哈希值的不同可以渲染不同的组件 可以通过window.addeventlistener('popstate')监控到哈希值的变化
//问题 丑 服务端无法获取锚点 服务端无法根据路径解析内容 无法实现seo优化

// history模式 H5提供的 可以改变路径 同时强制刷新时会带上路径 服务端解析路径 因此可用于服务端渲染和seo优化 需要服务端支持
// 后续页面基于historyapi即可

export default router
