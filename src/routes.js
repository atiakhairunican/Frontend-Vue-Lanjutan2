import Vue from 'vue'
import VueRouter from 'vue-router'
import History from './views/history.vue'
import Product from './views/product.vue'
import Login from './views/login.vue'
import PageNotFound from './views/page404.vue'
import Store from './store/index'

const CoffeeShop = JSON.parse(localStorage.getItem('CoffeShop'))

const isAuth = (to, from, next) => {
    if (Store.getters["getIsAuth"] == true) {
        next()
    }
    else {
        next('/login')
    }
}

Vue.use(VueRouter)

const mainRouter = new VueRouter({
    mode : "history",
    routes : [
        {
            path : "/",
            name : "home",
            component : Product,
            // meta: { requiresAuth: true },
            beforeEnter : isAuth,
        },
        {
            path : "/history",
            name : "history",
            component : History,
            // meta: { requiresAuth: true },
            beforeEnter : isAuth,
        },
        {
            path : "/login",
            name : "login",
            component : Login,
            meta: { requiresVisitor: true },
        },
        {
            path : "*",
            name : "PageNotFound",
            component : PageNotFound,
        }
    ]
})

mainRouter.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresVisitor)) {
        if (CoffeeShop.Login.users != null) {
            next({path: "/"});
        }
        else {
            next();
        }
    }
    else {
        next();
    }
});

export default mainRouter