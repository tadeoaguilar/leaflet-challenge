let API_KEY = "pk.eyJ1IjoidGFkZW9hZ3VpbGFyIiwiYSI6ImNrZzAxYjZ3MTAxbmUyc214aGh6ZTMxbHkifQ.eMm7befnh5VJdtadGtHTpw"

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  NORMAL: new L.LayerGroup()

};

// Create the map with our layers
var map = L.map("map", {
  center: [40.73, -74.0059],
  zoom: 12,
  layers: [layers.NORMAL]
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = { 
  "Healthy Stations": layers.NORMAL
 };

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

// Initialize an object containing icons for each layer group
var icons = {
  
  NORMAL: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  })
};
s=""
station = ""
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson", data=> {
    console.log(data)
    s=data
   
    // Create an object to keep of the number of markers in each layer
    var stationCount = {
     NORMAL: 0
      };

      console.log("A")
      console.log(data.features.length)
      for (var i = 0; i < data.features.length; i++) {
        
        
        // Create a new station object with properties of both station objects
        var station = Object.assign({},data.features[0].geometry.coordinates );

      }

      console.log(station[0])
    // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
    var stationStatusCode;

    
        stationStatusCode = "NORMAL";

      // Update the station count
      stationCount[stationStatusCode]++;
      // Create a new marker with the appropriate icon and coordinates
      var newMarker = L.marker([station[0], station[1]], {
        icon: icons[stationStatusCode]
      });

      // Add the new marker to the appropriate layer
      newMarker.addTo(layers[stationStatusCode]);

      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
      newMarker.bindPopup(station.name + "<br> Capacity: " + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
    
      updateLegend("12:00:00", stationCount);
    // Call the updateLegend function, which will... update the legend!

    }






);
function updateLegend(time, stationCount) {
    document.querySelector(".legend").innerHTML = [
      "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
      
      "<p class='low'>Low Stations: " + "</p>",
      "<p class='healthy'>Healthy Stations: " +  "</p>"
    ].join("");
  }
  