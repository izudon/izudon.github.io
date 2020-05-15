// Prepares "Loading..." Popup.
//var popup = L.popup()
//.setLatLng([0,0])
//.setContent("Loading...")
//.openOn(map);

// geoJSON overlay

// Load GeoJSON
d3.json("/assets/map/kansai-cinema.geojson", function(json){

	// DEBUG
	console.log(json);

	// Create GeoJSON Object for the map.
	L.geoJSON( json, {

		// Visual Style Specification
		style: function(feature){
			// console.log(feature);
			// console.log(feature.geometry.type);
			return { color: "maroon" };
		}

	})

	// Reserve Popup Contents to each GeoJSON Object(Layer).
	.bindPopup(function(layer){
		// console.log(layer);
		// layer <- Rendering Object with GeoJSON Feature ...
		// ... i.e. GeoJSON geometry and feature properties
		// return layer.feature.properties.NAME_JA;
		return layer.feature.properties.name;
	})

	// Add to the map.
	.addTo(map);

	// Remove "loading..." popup.
	popup.remove();
});
