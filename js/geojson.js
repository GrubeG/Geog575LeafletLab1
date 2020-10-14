/* Map of GeoJSON data from MegaCities.geojson */

//function to instantiate the Leaflet map
function createMap(){
    
    //add OSM base tilelayer
    var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});
        
    var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16
});
       
    var baseMaps = {
    "Topo": Esri_NatGeoWorldMap,
    "Black and White": CartoDB_Positron
    };
    
    //create the map
    var map = L.map('mapid', {
        center: [44.5, -90],
        zoom: 7,
        layers: [CartoDB_Positron]
    });
      
    //call getData function
    getData(map);
    
    L.control.layers(baseMaps).addTo(map);
};

$(document).ready(createMap);