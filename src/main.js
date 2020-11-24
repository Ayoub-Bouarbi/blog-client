window.axios = require('axios');

import Vue from 'vue'
import { createProvider } from './vue-apollo'
import App from './App.vue'
import store from './store'
import router from './router'
import filters from './filters'

import './css/app.css';


Vue.config.productionTip = false

// Vue.use(filters);

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
