import Vue from 'vue'
import VueRouter from 'vue-router'
import History from './views/history.vue'
import Product from './views/product.vue'

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
        }
    ]
})

export default mainRouter