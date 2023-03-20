import install, { Vue } from "./install";
class VueRouter {
  constructor(options) {
    //用户传递的路由配置 可以对这个配置进行路由映射
    let routes = options.routes;
  }
}

//将用户的配置进行映射

//将根实例注入的router属性共享给每一个组件
// 为什么要多发明一个install方法 用户导出了一个类 在类上写一个install方法 会先调用install方法
VueRouter.install = install;
export default VueRouter;
