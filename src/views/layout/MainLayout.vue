<template>
    <v-app>
    <v-navigation-drawer v-model="drawer" app temporary fixed clipped>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              <span>Menu</span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <template v-for="(item, index) in items">
          <v-list-tile :href="item.href" :to="{name: item.href}" :key="index">
            <v-list-tile-action>
              <v-icon light v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="purple" dark app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Passport App</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hellouser" v-if="user_name">Hello {{user_name}}</div>
      <!-- <router-link :to="{ name: 'Logout' }"> -->
        <!-- <v-btn> -->
            <v-icon @click="logout">logout</v-icon>
        <!-- </v-btn> -->
      <!-- </router-link> -->
    </v-toolbar>
    <v-content>
      <v-container>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
        </v-container>
    </v-content>
    <!-- <v-footer class="purple pa-3" dark app>
      <span>© 2018 - <a href="http://tryndev.com" class="indigo text--lighten-5">Try-N-dev</a></span>
    </v-footer> -->
  </v-app>
</template>
<script type="text/babel">
export default {
  data() {
    return {
      user_name: '',
      drawer: false,
      items: [{
        href: 'Home',
        title: 'Home',
        icon: 'home',
      }, {
        href: 'Todo',
        title: 'Todos',
        icon: 'extension',
      }
    ],
    };
  },
    computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  },
  created() {
    this.$store.dispatch('retrieveName')
    .then(response => {
    this.user_name = response.data.name
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('destroyToken')
      .then(response => {
        this.$router.push({ name: 'Login' })
      })
    }
  },
};
</script>
<style>
a {text-decoration: none;}
.hellouser{
  padding: 1em 1.5em;
}
</style>

