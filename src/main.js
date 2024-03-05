import Vue from 'vue'
import VueRouter from 'vue-router';
import VueCookies from "vue-cookies";
import TDesign from 'tdesign-vue';
import 'tdesign-vue/es/style/index.css';

import Router from './router'
import Store from './store'
import App from './App.vue'

import eventBus from './eventbus'

Vue.config.productionTip = false
Vue.use(TDesign)
Vue.use(VueRouter)
Vue.use(VueCookies)

Vue.prototype.$eventBus = eventBus

const vueInstance = new Vue({
  router: Router,
  store: Store,
  render: h => h(App),
})

vueInstance.$mount('#app')
