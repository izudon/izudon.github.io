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
            'fill-opacity': 0.5
        },
        'filter': ['==', '$type', 'Polygon' ]
    });
});
