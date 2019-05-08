<template>
  <div id="app">
    <router-view/>  
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'root',
  mounted() {
    if (!this.$store.state.logged) {
      this.$router.replace({path: '/login'})
    } else {
      this.$router.replace({path: '/home'})
    }
  },
  methods: {
    logout: function() {
      this.$store.commit('signin', false)
    },
    
  },
  computed: {
    isAuthenticated: function() {
      return this.$store.state.logged
    }
  }
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
