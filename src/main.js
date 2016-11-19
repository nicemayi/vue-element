import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource'
import App from './App'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-default/index.css'

import ShippingPending from './components/ShippingPending.vue'
import PlaceOrder from './components/PlaceOrder.vue'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI, { locale })
var Sugar = require('sugar');
Vue.use(Sugar);


const router = new VueRouter({
    routes: [
        // { path: '/', component: ShippingPending },
        { path: '/', redirect: '/shipping-pending' },
        { path: '/shipping-pending', component: ShippingPending },
        { path: '/place-order', component: PlaceOrder}
    ]
})


new Vue({
    el: '#app',
    render: h => h(App),
    router: router
})
