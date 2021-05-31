import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import request from 'common/request.js'
Vue.use(uView);

Vue.config.productionTip = false
Vue.prototype.$http = request

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
