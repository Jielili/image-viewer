import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import './vendors/ant-design-vue.js'
import { install } from './vendors/my-icon.js'
import VueLazyload from 'vue3-lazyload';


const app = createApp(App)

// Object.values(import.meta.globEager('./(vendors|directives|filters)/*.js'))
//   .forEach(v => v.install?.(app))
install(app)
app.use(VueLazyload);

app.mount('#app')