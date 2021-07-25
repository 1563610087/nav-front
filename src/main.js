import Vue from 'vue'
// import * as MITO from '@mitojs/web'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/common/css/index.scss'
import App from './App'
import store from './store'
import router from './router'
// import '@/common/directive/directive.js'
// import '@/common/js/permission'

Vue.use(ElementUI)
// Vue.use(MITO.MitoVue)
// MITO.init({
//   dsn: 'http://test.com/error',
//   apikey: '123-2223-123-123'
// })
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
