import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
    data: {
        asd: '',
        password: '',
        happy_store_url: location.protocol + '//happystore.altervista.org/storeme/index.php',
        data_file: '',
        data_content: '',
    },
}).$mount('#app')
