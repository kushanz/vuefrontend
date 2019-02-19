import Vue from 'vue'
import './plugins/vuetify'
import Notifications from 'vue-notification'
import Axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify, {
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})

Vue.use(Notifications)

Vue.prototype.$http = Axios;
//  window.token = localStorage.getItem('token')
// if (token) {
//   Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer '+token
// }

window.Bus = new Vue();
window.axios= Axios
// window.token = localStorage.getItem('token');
// window.user= localStorage.getItem('user');
axios.defaults.baseURL = 'http://localhost/passport/public/api';
// axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'Login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'Home',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
