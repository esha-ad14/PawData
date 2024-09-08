import { createApp, VueElement } from 'vue'
import App from './App.vue'
import './css/index.css'
import router from './router/'

const app = createApp(App)
    app.use(router)
.mount('#app')