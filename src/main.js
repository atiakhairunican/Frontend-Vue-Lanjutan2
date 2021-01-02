import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import routes from './routes'
import store from "../src/auth/auth";

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router : routes,
  store: store,
  render: h => h(App),
}).$mount('#app')
