//1.创建一个映射表用
//2.添加新的路由配置用
export default function createRouteMap(routes, pathMap){ //根据用户选项 扁平化路由信息
    pathMap = pathMap || {}
    routes.forEach(route => {
        addRouteRecord(route, pathMap) //添加路由记录
    })
    // console.log(pathMap)
    return {
        pathMap
    }
}

function addRouteRecord(route, pathMap, parentRecord){
    let path = parentRecord ? `${parentRecord.path === '/' ? '' : parentRecord.path}/${route.path}` : route.path
    let record = {
        path,
        component: route.component,
        props: route.props,
        meta: route.meta,
        parent: parentRecord
    }
    if(!pathMap[path]){
        //维护路径对应的属性
        pathMap[path] = record
    }
    route.children && route.children.forEach(childRoute => {
        addRouteRecord(childRoute, pathMap, record)
    })
}
