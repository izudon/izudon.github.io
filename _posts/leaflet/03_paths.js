      // Paths overlay
      L.polyline( 
	      [[10,20],[25,45],[40,45],[50,20]],
	      { color: "blue" }
      ).addTo(map).bindPopup("I'm PolyLine.");
      L.polygon( 
	      [[10,120],[20,140],[50,140],[50,120]],
	      { color: "green" }
      ).addTo(map).bindPopup("I'm Polygon.");
      L.rectangle( 
	      [[10,20],[70,40]],
	      { color: "#ff00ff" }
      ).addTo(map).bindPopup("I'm Rectangle.");
      L.circle( 
	      [60,120], 300000,
	      { color: "blue" }
      ).addTo(map).bindPopup("I'm Circle.");
      L.circleMarker( 
	      [70,130], 30,
	      { color: "#0099ff" }
      ).addTo(map).bindPopup("I'm CircleMarker.");
      L.marker(
	      [45,90],
	      { draggable: true }
      ).addTo(map)
      .bindPopup("I'm a draggable marker.")
      .on( "dragend", function(e){
	      this.bindPopup(
	        L.popup().setContent(this.getLatLng().toString())
	      ).openPopup();
      });
