import Base from "./base";

class BrowserHistory extends Base {
    constructor(router){
        super(router)
    }
    setupListener(){ //稍后调用该方法监控hash的变化
        window.addEventListener('popstate', function(){
            // console.log(window.location.pathname)
        })
    }
    getCurrentLocation(){
        return window.location.pathname
    }
}

export default BrowserHistory