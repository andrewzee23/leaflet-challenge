// // Store API link
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"


// d3.json(queryUrl, function(data) {

//   createFeatures(data.features);
//   console.log(data.features)
// });

// function createFeatures(earthquakeData) {

//   function onEachFeature(feature, layer) {
//     layer.bindPopup("<h3>" + feature.properties.place +
//       "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
//   }

//   function radiusSize(magnitude) {
//     return magnitude * 20000;
//   }


//   function circleColor(magnitude) {
//     if (magnitude < 1) {
//       return "#ccff33"
//     }
//     else if (magnitude < 2) {
//       return "#ffff33"
//     }
//     else if (magnitude < 3) {
//       return "#ffcc33"
//     }
//     else if (magnitude < 4) {
//       return "#ff9933"
//     }
//     else if (magnitude < 5) {
//       return "#ff6633"
//     }
//     else {
//       return "#ff3333"
//     }
//   }


//   var earthquakes = L.geoJSON(earthquakeData, {
//     pointToLayer: function(earthquakeData, latlng) {
//       return L.circle(latlng, {
//         radius: radiusSize(earthquakeData.properties.mag),
//         color: circleColor(earthquakeData.properties.mag),
//         fillOpacity: 1
//       });
//     },
//     onEachFeature: onEachFeature
//   });

//   createMap(earthquakes);
// }

// function createMap(earthquakes) {


//   var outdoorsmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "outdoors-v11",
//     accessToken: API_KEY
//   });

//   var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "satellite-v9",
//     accessToken: API_KEY
//   });

//   var grayscalemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "light-v10",
//     accessToken: API_KEY
//   });

//   // Create the faultline layer
//   var faultLine = new L.LayerGroup();
  
//   // Define a baseMaps object to hold our base layers
//   var baseMaps = {
//     "Outdoor Map": outdoorsmap,
//     "Greyscale Map": grayscalemap,
//     "Satellite Map": satellitemap
//   };

//   // Create overlay object to hold our overlay layer
//   var overlayMaps = {
//     Earthquakes: earthquakes,
//     FaultLines: faultLine
//   };

//   // Create our map, giving it the streetmap and earthquakes layers to display on load
//   var myMap = L.map("map", {
//     center: [
//       37.09, -95.71
//     ],
//     zoom: 4,
//     layers: [outdoorsmap, earthquakes, faultLine]
//   });

//   // Create a layer control
//   // Pass in our baseMaps and overlayMaps
//   // Add the layer control to the map
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);

//   // Query to retrieve the faultline data
//   var faultlinequery = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";
  
//   // Create the faultlines and add them to the faultline layer
//   d3.json(faultlinequery, function(data) {
//     L.geoJSON(data, {
//       style: function() {
//         return {color: "orange", fillOpacity: 0}
//       }
//     }).addTo(faultLine)
//   })

//   // color function to be used when creating the legend
//   function getColor(d) {
//     return d > 5 ? '#ff3333' :
//            d > 4  ? '#ff6633' :
//            d > 3  ? '#ff9933' :
//            d > 2  ? '#ffcc33' :
//            d > 1  ? '#ffff33' :
//                     '#ccff33';
//   }

// // Add legend to the map
//   var legend = L.control({position: 'bottomright'});
  
//   legend.onAdd = function (map) {
  
//       var div = L.DomUtil.create('div', 'info legend'),
//           mags = [0, 1, 2, 3, 4, 5],
//           labels = [];

          
//       for (var i = 0; i < mags.length; i++) {
//           div.innerHTML +=
//               '<i style="background:' + getColor(mags[i] + 1) + '"></i> ' +
//               mags[i] + (mags[i + 1] ? '&ndash;' + mags[i + 1] + '<br>' : '+');
//       }
  
//       return div;
//   };
  
//   legend.addTo(myMap);
// }

// -------------------------------------------------------------------------
  // Starting with class activity 17 / day 1 / activity 10

  function getColor(depth){
    if (depth <=10){
      return 'orange'
    }
    if (depth <=30){
      return 'green'
    }
    if (depth <=50){
      return 'blue'
    }
    if (depth <=70){
      return 'pink'
    }
    if (depth <=90){
      return 'yellow'
    }
    if (depth > 90){
      return 'red'
    }
}
  // Store our API endpoint inside queryUrl
let queryUrl = ("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
// Once we get a response, send the data.features object to the createFeatures function
createFeatures(data.features);
});

function createFeatures(earthquakeData) { //earthquakeData delivers returns 

// Define a function we want to run once for each feature in the features array
// Give each feature a popup describing the place and time of the earthquake
function onEachFeature(feature, layer) {
  layer.bindPopup("<h3>" + feature.properties.place +
    "</h3><hr><p>" + new Date(feature.properties.time) +
    "</h3><hr><p>" + "Magnitude: " + feature.properties.mag +
    "</h3><hr><p>" + "Depth: " + feature.geometry.coordinates[2]+ "</p>");
}
console.log(earthquakeData);

function pointToLayer(feature, latlng){
    let circle = L.circleMarker(latlng, {
      fillOpacity: 1,
      radius: feature.properties.mag * 3,
      color: getColor(feature.geometry.coordinates[2])

    });
  return circle
}

// Create a GeoJSON layer containing the features array on the earthquakeData object
// Run the onEachFeature function once for each piece of data in the array
let earthquakes = L.geoJSON(earthquakeData, {
  onEachFeature: onEachFeature,
  pointToLayer: pointToLayer
});

// Sending our earthquakes layer to the createMap function
createMap(earthquakes);
}

function createMap(earthquakes) {

// Define streetmap and darkmap layers
let streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

let lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
});
  
let darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

let satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.satellite',
  accessToken: API_KEY
});


// Define a baseMaps object to hold our base layers
let baseMaps = {
  "Street Map": streetmap,
  "Light Map": lightmap,
  "Dark Map": darkmap,
  "Satellite": satellite
};

// Create overlay object to hold our overlay layer
let overlayMaps = {
  Earthquakes: earthquakes
};

// Create our map, giving it the streetmap and earthquakes layers to display on load
let myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,
  layers: [streetmap, earthquakes]
});

// Create a layer control
// Pass in our baseMaps and overlayMaps
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

let legend = L.control({position: 'bottomright'});
legend.onAdd = function(map){

let div = L.DomUtil.create("div", 'info legend'),

  depth = [0, 10, 30, 50, 70, 90],
  color = ['orange', 'green', 'blue', 'pink', 'yellow', 'red'];

  for (let i = 0; i<depth.length; i++){
    div.innerHTML +=
    '<i style="background:' + color[i] + '"></i> ' +
    depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');    
  }
    return div;

  };
legend.addTo(myMap);
}