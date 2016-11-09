import Vue from 'vue'
import Router from 'vue-router';


import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'


import 'element-ui/lib/theme-default/index.css'

import App from './App.vue'

import ClientShippingPendingTable from './components/ClientShippingPendingTable.vue'
import ClientInventoryTable from './components/ClientInventoryTable.vue'
import Receive from './components/Receive.vue'
import ElementForm from './components/ElementForm.vue'
import VueResource from 'vue-resource'


Vue.use(VueResource);

var Sugar = require('sugar');



// Vue.use(ElementUI)
Vue.use(ElementUI, { locale })
Vue.use(Router);
Vue.use(Sugar);
const router = new Router({
  routes: [
    { path: '/shipping-pending', component: ClientShippingPendingTable },
    { path: '/status', component: ClientInventoryTable}
  ]
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})





