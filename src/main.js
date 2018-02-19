import './scss/style.scss';
import Vue from 'vue'
import App from './App.vue'

import Store from './Store';
Vue.prototype.$store = new Vue(Store);

new Vue({
    el: '#app',
    render: h => h(App)
});