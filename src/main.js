import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'

import './plugins/bootstrap-vue'

Vue.config.productionTip = false

Vue.use(VueAxios,axios);
Vue.use(VueCookies)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
