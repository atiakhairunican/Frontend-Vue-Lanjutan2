import Vue from 'vue'
import VueRouter from 'vue-router'
import History from './views/history.vue'
// import Product from './views/product.vue'
import Product from './views/product.vue'
import Detail from "./views/detail"

Vue.use(VueRouter)

const mainRouter = new VueRouter({
    routes : [
        {
            path : "/",
            name : "home",
            component : Product
        },
        {
            path : "/history",
            name : "history",
            component : History
        },
        {
            path: "/detail",
            name: "detail",
            component: Detail,
            props: true,
        },
    ]
})

export default mainRouter