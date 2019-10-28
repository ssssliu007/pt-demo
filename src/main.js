import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import './plugins/bootstrap-vue'

Vue.config.productionTip = false

Vue.use(VueAxios,axios);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
