export default class GmShapeFunctions{
    constructor(){
        
    }
    
    static createPolygon(map, latLongs, fillColor, strokeColor) {
        let poly = new google.maps.Polygon({
            fillColor: fillColor,
            fillOpacity: '0.3',
            strokeColor: strokeColor,
            strokeOpacity: '0'
        });
        poly.setPath(latLongs);
        poly.setMap(map);
    }
    
    static createPolyline(map, latLongs, fillColor, strokeColor) {   
        //add last element to start to make a closed polyline
        latLongs.unshift(latLongs[latLongs.length - 1]);
    
        let lineSymbol = {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: fillColor,
            fillOpacity: '1',
            strokeColor: strokeColor,
            strokeOpacity: 1,
            scale: 2
        };
        let polyline = new google.maps.Polyline({
            path: latLongs,
            strokeOpacity: 0,
            icons: [{
                icon: lineSymbol,
                offset: '0',
                repeat: '10px'
            }],
            map: map
        })
    }
}