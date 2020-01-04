import Vue from 'vue'
import App from './App.vue'
import Menu from './components/Menu.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import ListaProjetos from './components/ListaProjetos.vue'
import SobreNos from './components/SobreNos.vue'
import Carrossel from './components/Carrossel.vue'
import Institucional from './components/Institucional.vue'

Vue.config.productionTip = false

Vue.component('app-menu', Menu)
Vue.component('app-footer', Footer)
Vue.component('app-header', Header)
Vue.component('app-list', ListaProjetos)
Vue.component('app-aboutus', SobreNos)
Vue.component('app-carroussel', Carrossel)
Vue.component('app-institucional', Institucional)


new Vue({
  render: h => h(App),
}).$mount('#app')
