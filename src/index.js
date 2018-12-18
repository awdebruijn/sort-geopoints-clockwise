require('./main.scss');
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
Vue.use(VueGoogleMaps, {
    load: {
        installComponents: true,
        key: '',
        v: '3.34',
        libraries: 'geometry'
    }
});
Vue.component('google-map', VueGoogleMaps.Map);
Vue.component('g-map-marker', VueGoogleMaps.Marker);
Vue.component('g-map-info-window', VueGoogleMaps.InfoWindow);
import gm from './components/gm.vue';

let app = new Vue({
    el: '#app',
    components:{
        'gm' : gm
    },
    data: {
        
    }
});
