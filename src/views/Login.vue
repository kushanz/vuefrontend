<template>
   <div>
     <v-toolbar class="purple" dark app>
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-toolbar-title>Passport App</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'Register' }">
        <!-- <v-btn> -->
            <v-icon>user</v-icon>
        <!-- </v-btn> -->
      </router-link>
    </v-toolbar>
    <v-content>
      <v-container>
    <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <!-- <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear> -->
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
             
              </v-toolbar>
                <v-form action="#" @submit.prevent="login">
                  <v-card-text>
                      <v-text-field solo-inverted prepend-icon="person" name="email" label="email" v-model="email" type="text"></v-text-field>
                      <v-text-field solo-inverted id="password" prepend-icon="lock" name="password" label="Password" v-model="password" type="password"></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="loading" type="submit" color="primary">
                      <v-progress-circular v-if="loading" :width="3" :size="20" style="margin-right:10px;" indeterminate color="amber"></v-progress-circular>
                      Login
                    </v-btn>
                  </v-card-actions>
                </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  name:'login',
  props: {
    dataSuccessMessage: {
      type: String,
    }
  },
  data() {
    return {
      email: '',
      password: '',
      serverError: '',
      successMessage: this.dataSuccessMessage,
      loading: false,
    }
  },
  methods: {
    login() {
      this.loading = true
      this.$store.dispatch('retrieveToken', {
        email: this.email,
        password: this.password,
      })
        .then(response => {
          this.loading = false
          this.$router.push({ name: 'Home' })
        })
        .catch(error => {
          this.loading = false
          this.serverError = error.response.data
          this.password = ''
          this.successMessage = ''

          this.$notify({
            group: 'msg',
            type:'error',
            title: error.response.data.message,
            text: error.response.data.errors
          });
        })
    }
  }
}
</script>
<style>
.v-progress-linear {
  margin: 0px;
}
</style>
