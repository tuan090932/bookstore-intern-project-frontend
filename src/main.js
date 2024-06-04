import '@/index.css'
import '@/assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
// import Default from './layouts/Default.vue'
// import Vue from 'vue'

const app = createApp(App)

// Vue.component('default-layout', Default)
app.use(createPinia())
app.use(router)

app.mount('#app')
