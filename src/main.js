import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/charts'
import './plugins/swiper'
import i18n from './plugins/i18n'
import './plugins/api'
import { setInteractionMode } from 'vee-validate'
import infiniteScroll from 'vue-infinite-scroll'

setInteractionMode('eager')
Vue.use(infiniteScroll)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
