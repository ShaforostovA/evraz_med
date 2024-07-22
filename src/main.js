import './assets/css/main.css';

import { createApp } from 'vue';
import App from './App.vue'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

const app = createApp(App)
app.use(Header)
app.use(Footer)
app.mount('#app')
