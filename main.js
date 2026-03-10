import App from './App'
import uviewPlus from 'uview-plus'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { getImg } from '@/utils/http.js'
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
Vue.prototype.$getImg = getImg
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate)
    app.use(uviewPlus)
    app.use(pinia)
  return {
    app
  }
}
// #endif