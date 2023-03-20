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
      } else {
        // 所有组件上增加一个_routerRoot指向根实例
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
      //在组件中都可通过this._routerRoot._router
    },
  });
  console.log("install");
  //不能直接将属性定义在原型上 只有通过newVue中传入了router才能被共享
  //实例上取值 拿到_router属性 代理
  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this._routerRoot && this._routerRoot._router;
    },
  });

  Vue.component('router-link',{
    render(){
        return <a>{this.$slots.default}</a>
    }
  })
  Vue.component('router-view',{
    render(){
        return <div>11</div>
    }
  })
}
export default install;
