<template>
    <div>
        <google-map ref="mapRef" class="map" :center="{lat: 52.140271, lng: 5.5784093}" :zoom="8">
            <g-map-marker v-for="marker in markers" :key="marker.id" ref="map-marker" :position="{lat: marker.lat, lng: marker.long}" :icon="marker.icon" :clickable="true" @@click="toggleInfoWindow(marker, marker.id)"></g-map-marker>
        </google-map>
    </div>
</template>

<script>
import {gmapApi} from 'vue2-google-maps';
import SortGeoPointsCircular from '../js/SortGeoPointsCircular.js';
import GmShapeFunctions from '../js/GmShapeFunctions.js';

export default {
    data(){
        return {
            markers: [
                { 
                    lat: 53.2216999,
                    long: 6.5306741 
                },
                {
                    lat: 52.7115491, 
                    long: 6.1639681
                },
                { 
                    lat: 52.7803717,
                    long: 6.8353047 
                },
                {
                    lat: 50.8577915,
                    long:5.6658845 
                },
                {
                    lat: 50.8577915,
                    long: 4.6658845
                },
                {
                    lat: 52.9342776, 
                    long: 4.7260704
                },
                {
                    lat: 52.3546274, 
                    long: 4.828584
                },
                {
                    lat: 51.9279515,
                    long: 4.4203673
                }
            ],
            infoContent: '',
            infoWindowPos: null,
            infoWinOpen: false,
            currentMidx: null,
            infoOptions: {
                pixelOffset: {
                    width: 0,
                    height: -35
                }
            },
        }
    },
    mounted() {
        this.$refs.mapRef.$mapPromise.then((map) => {
            map.setOptions({streetViewControl: false, mapTypeControl: false});
            let sortedForPolyline = new SortGeoPointsCircular(this.markers).sortMarkers();
            let polyline = GmShapeFunctions.createPolyline(map, sortedForPolyline, '#ff0000', '#ff0000');
        });

    }
}
</script>

<style lang="scss">
.map{
    width: 800px;
    height: 800px;
    margin: 100px auto;
}
</style>
