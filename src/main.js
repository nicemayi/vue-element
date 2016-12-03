import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource'
import App from './App'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-default/index.css'

import ShippingPending from './components/ShippingPending.vue'
import PlaceOrder from './components/PlaceOrder.vue'
import ClientInventory from './components/ClientInventory.vue'
import ReceiveBox from './components/ReceiveBox.vue'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI, { locale })
var Sugar = require('sugar');
Vue.use(Sugar);


const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/shipping-pending' },
        { path: '/shipping-pending', component: ShippingPending },
        { path: '/place-order', component: PlaceOrder},
        { path: '/check-client-inventory', component: ClientInventory},
        { path: '/receive-box', component: ReceiveBox}
    ]
})


new Vue({
    el: '#app',
    render: h => h(App),
    router: router
})
