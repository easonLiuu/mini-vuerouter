import routerLink from "./components/router-link";
import routerView from "./components/router-view";

export let Vue;
function install(_Vue) {
  Vue = _Vue; //将传入的vue构造函数变为全局的
  Vue.mixin({
    //mergeOptions所有组件初始化都会采用这个方法
    beforeCreate() {
      // 有router才加 没有不加
      // this.$router = this.$options?.router
      //组件渲染从父到子
      if (this.$options.router) {
        //根实例传递了router
        this._routerRoot = this; //根实例
        this._router = this.$options.router;
        //初始化操作
        this._router.init(this) //this就是整个应用 newVue
        //Vue.util.defineReactive(this)
        //给根实例添加属性就是当前的current对象 变成响应式的
        //两次改的不是一个current
        Vue.util.defineReactive(this, '_route', this._router.history.current)
        //暴露的根实例 通过this._router拿到根实例 通过this._route拿到current对象
      } else {
        // 所有组件上增加一个_routerRoot指向根实例
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
      //在组件中都可通过this._routerRoot._router
    },
  });
  //不能直接将属性定义在原型上 只有通过newVue中传入了router才能被共享
  //实例上取值 拿到_router属性 代理
  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this._routerRoot && this._routerRoot._router;
    },
  });
  Object.defineProperty(Vue.prototype, "$route", { //所有组件里面都有一个$route属性 对应的就是我们里面写的current
    get() {
      return this._routerRoot && this._routerRoot._route;
    },
  });

  Vue.component('router-link', routerLink)
  Vue.component('router-view', routerView)
}
export default install;
