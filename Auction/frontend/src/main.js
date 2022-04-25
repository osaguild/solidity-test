import Vue from 'vue'
import App from './App.vue'
import { ethers } from "ethers";

Vue.use(ethers);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
