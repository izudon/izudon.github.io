---
date: 2020-05-12 17:12:39 +0900
leaflet:
  id: chiriin_pale
  setZoom: 7
jsinclude: leaflet/05_kansai_cinema.js
---

* [OpenStreetMap](https://www.openstreetmap.org/)
  \> [Planet OSM](https://planet.openstreetmap.org)
  \> [Geofabrik](https://download.geofabrik.de/asia/japan/kansai.html)
  \> [japan](https://download.geofabrik.de/asia/japan.html)
  \> [kansai](https://download.geofabrik.de/asia/japan/kansai.html)  
  2020-05-07 より `osmium` を用いて「映画館」を抽出。
* 映画館＝タグ `amenity=cinema` の設定があるノードまたはウェイ。


```shell
$ osmium tags-filter -o kansai-cinema.pbf kansai-latest.osm.pbf \
  nw/amenity=cinema 
$ osmium export -f geojson kansai-cinema.pbf \
  > kansai-cinema2.geojson
```

```javascript
{% include_relative {{ page.jsinclude }} %}
```
