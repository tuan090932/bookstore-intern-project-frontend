import '@/index.css';
import '@/assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import FontAwesomeIcon from '@/plugins/fontAwesome';
import setupVeeValidate from '@/plugins/veeValidate';
import i18n from '@/plugins/i18n';
import App from '@/App.vue';
import router from '@/router';
import filters from '@/helpers/filters'

const app = createApp(App);

setupVeeValidate(app);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.component('font-awesome-icon', FontAwesomeIcon);
app.config.globalProperties.$filters = filters

app.mount('#app');
