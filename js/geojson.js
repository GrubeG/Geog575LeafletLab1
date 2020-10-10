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
    
    
    var WisCities = L.tilelayer('data/NonCities.geojson')
    
    var NonCities = L.tilelayer('data/NonCities.geojson');
    
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
    
    
    
    
    

    var WisCities = null;
    
    $.getJSON('data/WisCities.geojson',function(data){
    // add GeoJSON layer to the map once the file is loaded
    WisCities = L.geoJson(data,{
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name);
            }
        }).addTo(map);
    });
    
    $( "#addButton" ).click(function() {
        map.removeLayer(WisCities);
        $.getJSON('data/WisCities.geojson',function(data){
            // add GeoJSON layer to the map once the file is loaded
            WisCities = L.geoJson(data,{
                onEachFeature: function (feature, layer) {
                    layer.bindPopup(feature.properties.name);
                }
            }).addTo(map);
        });
    });

     $( "#removeButton" ).click(function() {
         map.removeLayer(WisCities);
     });

    // Use $( "elementID") and the jQuery click listener method to create a filter
    $( "#filterNonCities" ).click(function() {
        map.removeLayer(WisCities);
        $.getJSON('data/WisCities.geojson',function(data){
            // add GeoJSON layer to the map once the file is loaded
            WisCities = L.geoJson(data,{
                onEachFeature: function (feature, layer) {
                    layer.bindPopup(feature.properties.name);
                }, filter: function (feature, layer) {
                    return feature.properties.Pop_1850 != "1";
                }
            }).addTo(map);
        });
    });   
    
    
    
    
    
    L.control.layers(baseMaps, overlayMaps).addTo(map);
    
    
    
};

$(document).ready(createMap);