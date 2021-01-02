import Vue from 'vue'
import VueRouter from 'vue-router'
import History from './views/history.vue'
import Product from './views/product.vue'
import Login from './views/login.vue'

Vue.use(VueRouter)

const mainRouter = new VueRouter({
    mode : "history",
    routes : [
        {
            path : "/",
            name : "home",
            component : Product,
            meta: { requiresAuth: true },
        },
        {
            path : "/history",
            name : "history",
            component : History,
            meta: { requiresAuth: true },
        },
        {
            path : "/login",
            name : "login",
            component : Login
        }
    ]
})

mainRouter.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (localStorage.getItem("access_token") == undefined ||
        localStorage.getItem("access_token") == null ||
        localStorage.getItem("access_role") == undefined ||
        localStorage.getItem("access_role") == null
        ) {
            next({
                path: "/login",
        });
        } else {
            next();
        }
    } else {
        next();
    }
    });

export default mainRouter