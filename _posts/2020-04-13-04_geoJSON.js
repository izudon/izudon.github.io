---
layout: leaflet
---
      var map = L.map('map').setView([51, 0], 0);
      var popup = L.popup().setLatLng([0,0]).setContent("Loading...").openOn(map);

      L.tileLayer('/tiles/osmlogo/{z}/{y}/{x}.png', {
        attribution: 'attr',
        maxZoom: 4,
      }).addTo(map);

      // geoJSON overlay
      d3.json("/assets/for-leaflet-lesson/worldmap.geojson", function(json){
        console.log(json);
	L.geoJSON( json, {
	  style: function(feature){
	    return { color: "maroon" };
	  }
	}).bindPopup(function(layer){
          return layer.feature.properties.NAME_JA;
	}).addTo(map);
	popup.remove();
      });
