import './assets/main.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import "@mdi/font/css/materialdesignicons.css";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

//import 'dotenv/config';
//import process from 'process';

// Agregamos la URL base de nuestra API

//console.log("apiUrl: " + apiUrl);
//axios.defaults.baseURL = `${process.env.VUE_APP_API_URL}/api`;

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)
app.use(vuetify)
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')

const apiUrl = import.meta.env.VITE_API_URL

console.log("env var: "+apiUrl)
//console.log("apiUrl: " + apiUrl);
//axios.defaults.baseURL = 'http://localhost:3101/api';
axios.defaults.baseURL = `${apiUrl}/api`;
axios.defaults.baseURL = apiUrl;
//axios.defaults.baseURL = `/api`;