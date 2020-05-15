// Paths overlay

// adds a **polyline** to the map and binds a popup.
L.polyline( 
    [[10,20],[25,45],[40,45],[50,20]],
    { color: "blue" }
).addTo(map).bindPopup("I'm PolyLine.");

// adds a **polygon** to the map and binds a popup.
L.polygon( 
    [[10,120],[20,140],[50,140],[50,120]],
    { color: "green" }
).addTo(map).bindPopup("I'm Polygon.");

// adds a **rectangle** to the map and binds a popup.
L.rectangle( 
    [[10,20],[70,40]],
    { color: "#ff00ff" }
).addTo(map).bindPopup("I'm Rectangle.");

// adds a **circle** to the map and binds a popup.
L.circle( 
    [60,120], 300000,
    { color: "blue" }
).addTo(map).bindPopup("I'm Circle.");

// adds a **circleMarker** to the map and binds a popup.
L.circleMarker( 
    [70,130], 30,
    { color: "#0099ff" }
).addTo(map).bindPopup("I'm CircleMarker.");

// adds a standalone draggable **marker** to the map and binds a popup.
// It tells on the dorag end the **latitude** and the **longtitude**.
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
