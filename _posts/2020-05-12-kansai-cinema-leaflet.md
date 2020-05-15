---
date: 2020-05-12 17:12:39 +0900
title: Kansai Cinema / Leaflet
leaflet:
  id: chiriin_pale
  setZoom: 7
jsinclude: mapjs/05_kansai-cinema-leaflet.js
---

* Leaflet 地図への GeoJSON オーバレイ表示（習作）。


# 抽出

* [OpenStreetMap](https://www.openstreetmap.org/)
  \> [Planet OSM](https://planet.openstreetmap.org)
  \> [Geofabrik](https://download.geofabrik.de/asia/japan/kansai.html)
  \> [japan](https://download.geofabrik.de/asia/japan.html)
  \> [kansai](https://download.geofabrik.de/asia/japan/kansai.html)  
  2020-05-07 より `osmium` を用いて「映画館」を抽出。
  * 条件：タグ `amenity=cinema` の設定があるノードまたはウェイ。
  * `osmium tags-filter` を用いる。

```shell
$ osmium tags-filter -o kansai-cinema.pbf kansai-latest.osm.pbf \
  nw/amenity=cinema 
```

# 変換

* `osmium export` を用いて変換。 

```shell
$ osmium export -f geojson kansai-cinema.pbf \
  > kansai-cinema2.geojson
```


# 表示

## HTML

### ヘッダ部

```html
<link
rel="stylesheet"
  href="/assets/lib/leaflet/leaflet.css" />
<script
  type="text/javascript"
  src="/assets/lib/leaflet/leaflet.js"></script>
<script
  type="text/javascript"
  src="/assets/lib/d3/d3.v3.min.js"></script>
```

### ボディ部

```html
<div id="map"></div>
<script type="text/javascript">
  var map = L.map( 'map' ).setView([34.7201,135.4952],7);

  L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
      attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html">地理院タイル（淡色地図）</a>',
      minZoom: 0,
      maxZoom: 18,
      errorTileUrl: '/tiles/_/none.png'
  }).addTo(map);
```

## JavaScript

* D3 で json を読み込み、完了したら function を呼び出す。
* 呼び出す function の中で GeoJSON を `addTo(map)` する。

```javascript
d3.json( "/assets/map/kansai-cinema.geojson", function(json){

	L.geoJSON( json, {

		// Visual Style Specification
		style: function(feature){
			return { color: "maroon" };
		}

	}).addTo(map);
}
```

# Source:

```javascript
{% include_relative {{ page.jsinclude }} %}
```
