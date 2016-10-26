import Vue from 'vue'
import Router from 'vue-router';


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './App.vue'

import ClientShippingPendingTable from './components/ClientShippingPendingTable.vue'
import ClientInventoryTable from './components/ClientInventoryTable.vue'
import Order from './components/Order.vue'
import ElementForm from './components/ElementForm.vue'
import ElementTest from './components/ElementTest.vue'


Vue.use(ElementUI)
Vue.use(Router);

const router = new Router({
  routes: [
    { path: '/receive', component: ElementForm },
    { path: '/order', component: Order },
    { path: '/shipping-pending', component: ClientShippingPendingTable },
    { path: '/status', component: ClientInventoryTable }
  ]
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})





