export default { //路由分为两种模式
    props: {
        to: {type: String, require: true},
        tag: {type: String, default: 'a'}
    },
    methods: {
        handler(){
            this.$router.push(this.to)
            // console.log(111111)
        }
    },
    render(){
        let tag = this.tag
        return <tag onClick={this.handler}>{this.$slots.default}</tag>
    }
}