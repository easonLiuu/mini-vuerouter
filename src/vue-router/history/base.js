class Base {
    constructor(router){
        this.router = router
    }
    transitionTo(location, listener){
        // 用之前的匹配方法了
        let record = this.router.match(location)
        //如果当路由切换时  应该调用transitionTo方法再次拿到新的记录
        console.log('record', record) // /about/a /about /a 匹配后找到所有组件 根据组件渲染到不同的router-view中
        listener && listener()
    }
}
export default Base