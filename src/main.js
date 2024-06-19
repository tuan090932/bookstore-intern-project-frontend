import '@/index.css'
import '@/assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import FontAwesomeIcon from '@/plugins/fontAwesome'
import setupVeeValidate from '@/plugins/veeValidate';
import App from '@/App.vue'
import router from '@/router'
import filters from './helpers/filters'

const app = createApp(App)

setupVeeValidate(app);
app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.config.globalProperties.$filters = filters
app.mount('#app')
