import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Cell, SwipeItem, Swipe } from 'vant'
import { Icon } from 'vant'
import Field from 'vant'

import 'vant/lib/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Cell)
app.use(Icon)
app.use(Field)
app.use({ Cell, SwipeItem, Swipe })

app.mount('#app')
