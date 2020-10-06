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
    
    var WisCities = L.tileLayer('data/WisCities.geojson');
    
    var NonCities = L.tileLayer('data/NonCities.geojson');
    
    var overlayMaps = {
    "Cities": WisCities,
    "Non-Cities": NonCities
    };
    
    //create the map
    var map = L.map('mapid', {
        center: [44.5, -90],
        zoom: 7,
        layers: [CartoDB_Positron]
    });
      
    
    //call getData function
    getData(map);
    
    L.control.layers(baseMaps, overlayMaps).addTo(map);
    
    
};

//function to retrieve the data and place it on the map
function getData(map){
//Example 2.3 line 22...load the data
    $.ajax("data/NonCities.geojson", {
        dataType: "json",
        success: function(response){
            //create marker options
            var geojsonMarkerOptions = {
                radius: 10,
                fillColor: "#ff1800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };

            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(response, {
                pointToLayer: function (feature, latlng){
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                }
            }).addTo(map);
        }
    });
};

$(document).ready(createMap);