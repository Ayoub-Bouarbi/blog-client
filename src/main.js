import Vue from 'vue'
import { createProvider } from './vue-apollo'
import App from './App.vue'
import store from './store'
import router from './router'
import './filters'

import './assets/css/app.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
