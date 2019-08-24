// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Methods from '@/server'
Vue.use(Methods)
Vue.use(MintUI)

Vue.config.productionTip = false
Vue.filter("filterImgUrl",(value,size = 240)=>{
  console.log(value)
  return value.replace('{size}',size)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
