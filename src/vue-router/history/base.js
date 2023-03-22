// 创造一个方法去更新路由 每次去更新current属性
function createRoute(record, location){
    let matched = []
    if(record){
        while(record){
            matched.unshift(record) //先放
            record = record.parent
        }
    }
    return {
        ...location,
        matched
    }
}
function runQueue(queue, from, to, cb){
    function next(index){
        if(index >= queue.length) return cb()
        let hook = queue[index]
        hook(from, to, ()=>next(index+1))
    }
    next(0)
}
class Base {
    constructor(router){
        this.router = router
        this.current = createRoute(null, {
            path: '/'
        })
    }
    transitionTo(location, listener){
        // 用之前的匹配方法了
        let record = this.router.match(location)
        let route = createRoute(record, { path: location })
        // {path: '/' matched: []}
        // {path: '/' matched: [Home]}
        // 当前跳转路径和之前存的一样 匹配结果也一样 不再发生跳转
        if(location === this.current.path && route.matched.length == this.current.matched.length){
            return
        }
        let queue = [].concat(this.router.beforeEachHooks) //多个钩子跳转时候可以解析后拼接在一起
        runQueue(queue, this.current, route, () => {
            //更新当前current对象
            this.current = route
            // console.log('current', this.current) //稍后current变化 我们更新页面显示
            // path: '/' matched: []
            // path: '/about/a' matched: [aboutRecord, aboutARecord]
            //如果当路由切换时  应该调用transitionTo方法再次拿到新的记录
            // console.log('record', record) // /about/a /about /a 匹配后找到所有组件 根据组件渲染到不同的router-view中
            listener && listener()
            this.cb && this.cb(route)
        })
        
    }
    listen(cb){ //自定义了一个钩子 this._route = route
        this.cb = cb
    }
}
export default Base

//路由钩子的实现
//路由权限的实现 钩子➕addRoutes
//$router 和 $route的区别？