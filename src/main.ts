import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'

// import * as Vue from 'vue'
// import { h } from 'vue'
// const app = Vue.createApp({
//     render: ()=>h(App)
// })
// app.use(router)
// app.mount('#app')


createApp(App).use(router).mount('#app')
