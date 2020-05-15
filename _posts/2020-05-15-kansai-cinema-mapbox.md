---
date: 2020-05-12 21:30:00 +0900
title: Kansai Cinema / Mapbox
mapbox: true
jsinclude: mapjs/06_kansai-cinema-mapbox.js
---

前回お話しした通り・・・

* Leaflet ではオーバレイのひとつだった GeoJSON ですが・・・
* Mapbox では `Source` として、背景地図と同等の扱いを受ける。  
  （背景地図はこの場合ベクトルタイル ）

きょうはこれを、GeoJSON を Mapbox に表示することを通して、
具体的にみていきたい。


# 実践

## ベースとなるコードを書く

* 一応、ここの例を書きますが（ソース表示すればわかりますが）、  
  本家さんのヘルプ丸写しなので皆様もそちらを丸写ししてください。

### ヘッダ部

```html
<meta
  name="viewport"
  content="initial-scale=1,maximum-scale=1,user-scalable=no">
<link
  rel="stylesheet" type="text/css"
  href="https://api.mapbox.com/mapbox-gl-js/v{{ site.data.versions.mapbox }}/mapbox-gl.css" />
<script
  src="https://api.mapbox.com/mapbox-gl-js/v{{ site.data.versions.mapbox }}/mapbox-gl.js"
  ></script>
```

### ボディ部

```html
<div id="map"></div>
<script>
  var map = new mapboxgl.Map({
    container: 'map',
    style: '/assets/map/jp1710-style.json',
    attributionControl: true,
    hash: true
  });
  map.addControl(new mapboxgl.NavigationControl());
</script>
```

### スタイルファイル

```
（省略）
```

* jp1710 からいただいたものです。
* 緯度経度とズームレベルの初期値だけ変えました（大阪中心にしました！）。


## GeoJSON 乗せる

### `Source` として GeoJSON を add する

```javascript
map.addSource( 'kansai-cinema', {
  type: 'geojson',
  data: '/assets/map/kansai-cinema.geojson'
});
```

### `Source` を`Layer` に 引いてきて add する

OpenStreetMap には

* 「ノード」すなわち「点」として入れられている映画館
* 「ウェイ」すなわち「建物の輪郭」を「多角形（ポリゴン）」として  
  入れられている映画館

この両方があるので今回は・・・

* 「点」は「円盤」として表示。
  * Leaflet でいう CircleMaker みないなものになります。  
    （ズームイン／アウトしても大きさが変わらない（ピクセル指定））。

```javascript
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
```

* 「多角形」は「多角形」として表示

```javascript
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
```


### これらを `map.on('load',` でくるむ

load 完了前に実行するとエラーとなるため。


# 結果

ページ冒頭の通り。

京都御所真西にある「千本日活」は、「点」としても「多角形」としても
マッピングされていたので両方表示される。

拡大していくと次第に建物の輪郭が円盤の大きさを超えてきて
前面に出てくる様子が見て取れる。


# Source:

```javascript
{% include_relative {{ page.jsinclude }} %}
```
