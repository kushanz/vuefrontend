import Vue from 'vue'
// import store from './store'
import Router from 'vue-router'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
import MainLayout from './views/layout/MainLayout'
import TodoList from './components/todo/TodoList.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/',
      component: MainLayout,
      redirect: '/dashboard/home'
    },
    {
      path: '/dashboard',
      name: 'Layout',
      component: MainLayout,
      redirect: '/dashboard/home',
      children:[
        {
          path: '/dashboard/home',
          name: 'Home',
          component: () => import('./components/Dashboard')
        },
        {
          path: '/dashboard/todo',
          name: 'Todo',
          component: () => import('./components/todo/TodoList')
        }
    ],
      meta:{requiresAuth: true}
    },
    {
      path: '/todolist',
      name: 'TodoList',
      component: TodoList,
      meta:{requiresAuth: true}
    },
    {
      path: '*',
      component: Login
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if (store.getters.isLoggedIn) {
//       next()
//       return
//     }
//     next('/login') 
//   } else {
//     next() 
//   }
// })
// const openRoutes=['Login','Register'];

// router.beforeEach((to, from, next) => {
//   if(openRoutes.includes(to.name)) {
//     next()
//   } else if(window.token) {
//     next()
//   } else {
//     next('/login')
//   }
// })
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.isAuth)) {
//     if (!window.token) {
//       next({
//         name: 'Login',
//       })
//     } else {
//       next()
//     }
//   } else if (to.matched.some(record => record.meta.visitor)) {
//     if (window.token) {
//       next({
//         name: 'Dashboard',
//       })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })


export default router
