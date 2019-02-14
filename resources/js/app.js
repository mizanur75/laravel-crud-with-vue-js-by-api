
require('./bootstrap');

import Vue from 'vue'
import {Form, HasError, AlertError} from 'vform'
import VueProgressBar from 'vue-progressbar'
import Snotify, { SnotifyPosition } from 'vue-snotify'
import VueResource from "vue-resource"
window.Form = Form
const SnotifyOptions = {
  toast: {
    position: SnotifyPosition.rightTop
  }
}

Vue.use(Snotify, SnotifyOptions)
Vue.use(VueResource);

const VueProgressBarOptions = {
    color: '#15b203',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
      speed: '0.2s',
      opacity: '0.6s',
      termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
  }
Vue.use(VueProgressBar, VueProgressBarOptions);  
// Vue.use(VueRouter, vue-router);  

Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('customer-component', require('./components/CustomerComponent.vue').default);
Vue.component('pagination', require('./components/PaginationComponent.vue').default);
Vue.component('invoice-component', require('./components/InvoiceComponent.vue').default);
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

const app = new Vue({
    el: '#app'
});
