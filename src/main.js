import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import axios from 'axios';
import echarts from 'echarts';//引入echarts
import './assets/reset.css';//引入css重置文件

// Vue.prototype.$axios=axios;
Vue.prototype.$echarts=echarts;

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
