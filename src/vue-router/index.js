import createMatcher from "./create-matcher"
import HashHistory from "./history/hash";
import BrowserHistory from "./history/history";
import install, { Vue } from "./install"

class VueRouter {
  constructor(options) {
    //用户传递的路由配置 可以对这个配置进行路由映射
    let routes = options.routes || [];
    console.log(routes)
    //变成映射表方便后续的匹配操作 可以匹配也可以添加新的路由
    this.matcher = createMatcher(routes);
    console.log('matcher', this.matcher)
    //根据不同的模式创建对应的不同的路由系统
    let mode = options.mode || 'hash'
    if(mode === 'hash'){
        this.history = new HashHistory(this) //hashchange
    }else if(mode === 'history'){
        this.history = new BrowserHistory(this) //historypopstate
    }
  }
  match(location){
    return this.matcher.match(location)
  }
  push(location){
    this.history.transitionTo(location)
  }
  init(app){
    let history = this.history
    //根据路径匹配到对应的组件渲染 之后监听路由变化
    history.transitionTo(history.getCurrentLocation(), () => {
        history.setupListener() //监听路由变化
    })
    //根据路径变化匹配对应组件进行渲染 路径变化了 需要更新试图 所以路径需要是响应式的
  }
}

//将用户的配置进行映射

//将根实例注入的router属性共享给每一个组件
// 为什么要多发明一个install方法 用户导出了一个类 在类上写一个install方法 会先调用install方法
VueRouter.install = install;
export default VueRouter;
