<script setup>
import { RouterView } from 'vue-router'
//import NavigationDrawer from './components/NavigationDrawer.vue';
</script>

<template>
  <v-app>
    <header>
      <v-app-bar>
        <v-img
    class="mx-2"
    src="assets/arbol.png"
    max-height="40"
    max-width="40"
    contain
  ></v-img>
        
        <v-app-bar-title>El Amigo Invisble</v-app-bar-title>
      </v-app-bar>
    </header>
    <v-main>
      <v-container>
        <v-col>
          <RouterView />
        </v-col>
      </v-container>

    </v-main>

  </v-app>

</template>


<script>
export default {
  data: () => ({
    
  })
}
</script>

<style scoped>
</style>
