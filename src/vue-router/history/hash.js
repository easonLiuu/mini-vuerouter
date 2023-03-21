import Base from "./base";

function ensureSlash(){
    if(window.location.hash){
        return
    }
    window.location.hash = '/'
}
function getHash(){
    return window.location.hash.slice(1)
}
class HashHistory extends Base {
    constructor(router){
        super(router)
        //初始化hash路由时 要给定一个默认的hash路径 /
        ensureSlash()
    }
    setupListener(){ //稍后调用该方法监控hash的变化
        window.addEventListener('hashchange', function(){
            getHash()
        })
    }
    getCurrentLocation(){
        return getHash()
    }
}

export default HashHistory