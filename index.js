import Vue from 'vue'
import Main from './src/js/main'
import './src/scss/main.scss'

new (Vue.extend(Main))().$mount('#app')

