map.on( 'load', function(){

    map.addSource( 'kansai-cinema', {
        type: 'geojson',
        data: '/assets/map/kansai-cinema.geojson'
    });

    map.addLayer({
        'id': 'kansai-cinema-point',
        'type': 'circle',
        'source': 'kansai-cinema',
        'paint': {
            'circle-radius': 10,
            'circle-color': '#3887be'
        },
        'filter': ['==', '$type', 'Point' ]
    });

    map.addLayer({
        'id': 'kansai-cinema-polygon',
        'type': 'fill',
        'source': 'kansai-cinema',
        'paint': {
            'fill-color': 'maroon',
            'fill-opacity': 0.25
        },
        'filter': ['==', '$type', 'Polygon' ]
    });

    map.addLayer({
        'id': 'kansai-cinema-line',
        'type': 'line',
        'source': 'kansai-cinema',
        'paint': {
            'line-color': 'maroon',
            'line-opacity': 1.0
        },
        'filter': ['==', '$type', 'LineString' ]
    });
});


function zoomInSenbon(){
    map.setCenter([135.7518,35.0239]);
    map.setZoom(13);
}

