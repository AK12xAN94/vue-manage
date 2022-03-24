import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import App from './App.vue'
import store from './store'
import http from 'axios';
import './api/mock.js'

import './assets/less/index.less'


Vue.use(ElementUI);

Vue.prototype.$http = http
Vue.prototype.$confirm = ElementUI.MessageBox.confirm
Vue.prototype.$message = ElementUI.Message

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token

  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }

})

new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    store.commit('addMenu', router)
  },
}).$mount('#app')
