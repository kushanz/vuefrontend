<template>
  <div>
     <v-toolbar class="purple" dark app>
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-toolbar-title>Passport App</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'Login' }">
        <!-- <v-btn> -->
            <v-icon>login</v-icon>
        <!-- </v-btn> -->
      </router-link>
    </v-toolbar>
    <v-content>
    <v-container>
        <v-layout align-center justify-center>
              <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                  <v-toolbar dark color="primary">
                    <v-toolbar-title>Register form</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card-text>
                    <v-form>
                      <v-text-field prepend-icon="email" name="Email" label="Email" type="text" v-model="user.email"></v-text-field>
                      <v-text-field prepend-icon="person" name="name" label="name" type="text" v-model="user.name"></v-text-field>
                      <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="user.password"></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="register()">Register</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        user:{
          email: null,
          name: null,
          password: null
        }
      }
    },
    methods: {
      register() {
        axios.post('./register',{name:this.user.name,email:this.user.email,password:this.user.password})
          .then((response) => {
          console.log(response);
          let  accessToken=response.data.auth.access_token;
          localStorage.setItem('token',accessToken);
          localStorage.setItem('user',response.data.user); 
          Bus.$emit('loggedIn');
          window.isSignedIn = true;
          }).catch((error)=> {
            console.log(error);
          })
        
      }
    }
  }
</script>
