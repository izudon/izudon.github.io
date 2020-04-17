---
layout: leaflet
---
      var map = L.map('map').setView([51, 0], 0);

      L.tileLayer('/tiles/osmlogo/{z}/{y}/{x}.png', {
        attribution: 'attr',
        maxZoom: 4,
      }).addTo(map);
