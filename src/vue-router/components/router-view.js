export default {
    // 函数式组件
    // 默认先渲染app.vue中的router-view 是router.view
    // 再渲染about中的router-view
    functional: true,
    render(h, {parent, data}){
        data.routeView = true
        //这里只是为了渲染 而且不记录在父子关系中
        let route = parent.$route //刚才的$route
        let depth = 0
        // $vnode和_vnode的区别要注意
        while(parent){
            if(parent.$vnode && parent.$vnode.data.routeView){
                depth++
            }
            parent = parent.$parent //不停向上查找父组件
        }
        let record = route.matched[depth]
        //没有匹配到组件
        if(!record){
            return h()
        }
        return h(record.component, data)
    }
}