// Our JSON link to the info of the Earthquakes that happened on previous week
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Creating markers and adjusting their size and color using magnitude of earthquake data
function markerSize(mag) {
  return mag * 25000;
  }
  // I pulled the marker colors using the console dropper tool and hex numbers 
  function markerColor(mag) {
    if (mag <= 1) {
        return "#ADFF2F";
    } else if (mag <= 2) {
        return "#9ACD32";
    } else if (mag <= 3) {
        return "#FFFF00";
    } else if (mag <= 4) {
        return "#ffd700";
    } else if (mag <= 5) {
        return "#FFA500";
    } else {
        return "#FF0000";
    };
  }

  // Reading in JSON data to create the basemap and basemap features
  d3.json(link, function(data) {
    createFeatures(data.features);
  });

function createFeatures(ourData) {
  // This reads in the earthquake data from our json
  let earthquakes = L.geoJSON(ourData, {
 onEachFeature : function (feature, layer) {
    // Making sure data is generated when earthquake blip is clicked
    layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + "<p> Mag.: " +  feature.properties.mag + "</p>")
    },  // This generates the blip per earthquake and the data for each
        pointToLayer: function (feature, latlng) {
        return new L.circle(latlng,
            {radius: markerSize(feature.properties.mag),
            fillColor: markerColor(feature.properties.mag),
            fillOpacity: 1,
            stroke: false,
    })
  }
  });
    
    createMap(earthquakes);
  }

// Creating the additional map layers and adding some cool backgrounds to the maps
// Maps were pulled from a Leaflet plugin site (https://leaflet-extras.github.io/leaflet-providers/preview/)

function createMap(earthquakes) {
  let satmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });
  let darkmap = L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png", {
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });
  
  let baseMaps = {
    "Satellite Map": satmap,
    "Dark Map": darkmap
  };
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Connecting our base map to the HTML page
  // Making sure the two layers generate
  let myMap = L.map("map", {
    center: [30,-100],
    zoom: 3,
    layers: [satmap, earthquakes]
  });

  // Adding Control panel
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Adding legend to top right corner
  let legend = L.control({position: 'topright'});

  // Making sure the Dom and Maps can be switched between
  // Generating backgrounds when clicked 
  // Making sure the legend works when clicked
  // Making sure earthquake layer can be turned on/off

  legend.onAdd = function () {
      let div = L.DomUtil.create('div', 'info legend'),
          magnitudes = [];
  
      for (let i = 0; i < magnitudes.length; i++) {
          div.innerHTML += '<i style="background:' + markerColor(magnitudes[i] + 1) + '"></i> ' + 
      + magnitudes[i] + (magnitudes[i + 1] ? ' - ' + magnitudes[i + 1] + '<br>' : ' + ');
      }
  
      return div;
  };
  
    legend.addTo(myMap);

  // Creating colorful legend Layer
  let colorfulLegend = L.control({position: 'bottomright'});
  // Generating colors and setting magnitude grades
  colorfulLegend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let grades = [1, 2, 3, 4, 5, 6];
    let colors = [
      "#b7f34d",
      "#e1f34d",
      "#f3db4d",
      "#f3ba4d",
      "#f0a76b",
      "#f06b6b"
     ]; 
    // Looping through "i" in grades to set grades "1-2", "2-3", etc...
    for (let i = 0; i < grades.length; i++) {
      div.innerHTML += "<li style='background: " + colors[i] + "'></li> " + //<li></li> for list items
        grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] : "+"); // Adding the " - " and " + "
    }
    return div;
  };
  colorfulLegend.addTo(myMap);
}