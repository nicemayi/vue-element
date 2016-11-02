import Vue from 'vue'
import Router from 'vue-router';


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './App.vue'

import ClientShippingPendingTable from './components/ClientShippingPendingTable.vue'
import ClientInventoryTable from './components/ClientInventoryTable.vue'
import Receive from './components/Receive.vue'
import ElementForm from './components/ElementForm.vue'

import testTable from './components/testTable.vue'



Vue.use(ElementUI)
Vue.use(Router);
// ClientShippingPendingTable
const router = new Router({
  routes: [
    { path: '/receive', component: Receive },
    { path: '/shipping-pending', component: testTable },
    { path: '/status', component: ClientInventoryTable }
  ]
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})





