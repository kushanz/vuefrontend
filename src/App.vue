<template>
  <v-app>
    <notifications group="msg" />
    <!-- <v-content> -->
      <router-view></router-view>
    <!-- </v-content> -->
  </v-app>
</template>

<script>
// import Login from './views/Login'
// import Register from './views/Register'

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  },
  methods: {
 
  },
  // computed: {
  //   isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  // },
  // mounted() {
  //   if(token) {
  //     this.onLoggedIn();
  //   }
  // },
  // created() {
  //   this.menus = this.noAuthMenu;
  //   Bus.$on('loggedIn',() => {
  //     this.onLoggedIn();
  //   });
  //   Bus.$on('logout', ()=> {
  //     this.onLogOut();
  //     // this.$router.push('/login');
  //   })
  //   this.$http.interceptors.response.use(undefined, function (err) {
  //       return new Promise(function (resolve, reject) {
  //         if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
  //           this.$store.dispatch(logout)
  //         }
  //         throw err;
  //       });
  //     });
  // }
}
</script>
