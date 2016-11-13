import Vue from 'vue'
import Router from 'vue-router';
import VueResource from 'vue-resource'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-default/index.css'

import App from './App.vue'
import ShippingPending from './components/ShippingPending.vue'
import PlaceOrder from './components/PlaceOrder.vue'


Vue.use(Router);
Vue.use(VueResource);
Vue.use(ElementUI, { locale })
var Sugar = require('sugar');
Vue.use(Sugar);

const router = new Router({
	routes: [
		{ path: '/#/', component: ShippingPending },
		{ path: '/shipping-pending', component: ShippingPending },
		{ path: '/place-order', component: PlaceOrder}
	]
})

new Vue({
	el: '#app',
	render: h => h(App),
	router: router
})




