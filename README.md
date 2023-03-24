# Mini-VueRouter

这次就尝试着实现一个Mini-VueRouter，前端路由分为两种模式，关于前端路由也衍生出了很多面试题，但具体实现原理和实现细节我一直一知半解，所以实现了一下它。

在实现它之前，我们来看一下前端路由和后端路由的区别：

- 映射关系不同。前端路由是一个路径映射一个组件；后端路由是一个路径映射一个处理本次请求的响应函数
- 前端路由不需要走网络，而后端路由需要走网络
- 前端路由切换页面不会使得网页刷新，后端路由切换页面会导致网页刷新
- 前端路由采用的是客户端渲染，后端路由是服务端渲染

然后再熟悉一下前端路由的用法：

```javascript
import Vue from 'vue'
import VueRouter from '@/vue-router'
import HomeView from '../views/HomeView.vue'
Vue.use(VueRouter) 
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
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]
const router = new VueRouter({
  mode: 'hash',
  routes
})
export default router
```

除了上面的基本用法以外，还有路由钩子，addRoute、addRoutes等常见方法，这里就不举例子了，但后面我们会一一实现它们。

## Project setup
```
yarn install
```
### Compiles and hot-reloads for development
```
yarn serve
```
