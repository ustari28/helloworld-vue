<template>
  <div>
   <div id="nav" v-if="isAuthenticated">
        <router-link to="/home">Home</router-link> |
        <router-link to="/search">Searh</router-link> |
        <router-link to="/events">Events</router-link> |
        <router-link to="/home/processes">Processes</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/login" v-on:click.native="logout()" replace>Logout</router-link>
    </div>
    <router-view/>  
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'home',
  methods: {
    logout: function() {
      this.$store.commit('signin', false)
    },
    
  },
  computed: {
    isAuthenticated: function() {
      return this.$store.state.logged
    }
  },
  created() {
    //this.$router.replace({path: '/home'})
  }
})
</script>

<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
