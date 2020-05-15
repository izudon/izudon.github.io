---
title: "Mapbox <=> Leaflet"
date: 2020-05-15 15:00:00 +0900
---

* [Mapbox <=> Leaflet]({% post_url 2020-05-15-mapbox-leaflet %})
* [Kansai Cinema / Mapbox]({% post_url 2020-05-15-kansai-cinema-mapbox %})
* [Kansai Cinema / Leaflet]({% post_url 2020-05-12-kansai-cinema-leaflet %})


# Leaflet では・・・

* 背景地図＋オーバレイ、というのが基本的な考え方でした。  
  （そういう、概念データモデルでした）。

```javascript
//-------- in Leaflet --------//
//  背景地図  ＋  オーバレイ
//  tileLayer     image
//                video
//				GeoJSON
```

* 従ってソースコードはこんな具合でした。

```javascript
//-------- in Leaflet --------//

// 1. マップをインスタンス化
var map = L.map('map').setView([35.0,135.0],5);

// 2. タイルレイヤを作成しマップに add する
L.tileLayer('/tiles/my-tile/{z}/{y}/{x}.jpg', {
  attribution: '<a href="...">mytile at me</a>'
}).addTo(map);

// 3. さらにいろんなものを add する
L.geoJSON( json, {
  color: "maroon"
}).addTo(map);
```


# Mapbox GL JS では・・・

## みんな `Source`

背景地図も、オーバレイも、みんなひっくるめて `Source` です。

```javascript
//-------- in Mapbox --------//
//  Sources
//  - 背景地図
//  - GeoJSON
//	- 画像
//  - 動画
```

* 背景地図は `Source`
  * ベクトルタイル も `Source` ( type: `vector` )
  * ラスタタイルも `Source` ( type: `raster` )
* GeoJSON も `Source` ( type: `geojson` )
* 画像も `Source` ( type: `image` )
* 動画も `Source` ( type: `video` )
* 標高タイルも `Source` ( type: `raster-dem` )

## ツマんで `Layer`

`Source` から、見せたいものをツマみ出して `Layer` を構成します。

* `Source` は単なる「データ源」、いわば「ネタ元」。
* そこから、見せたいものの「選び出し方」と「見せ方」を決め、  
  `Layer` として出します。
	1. バックエンドで `Source` を用意し、
    2. フロントエンドへ `Layer` として出す。
* ひとつの `Source` から 複数の `Layer` を作ることもある。

```javascript
//-------- in Mapbox --------//
//  Sources
//  (Source) 背景地図 --> Layer
//  (Source) GeoJSON  --> Layer
//	(Source) 画像
//  (Source) 動画     --> Layer
```

## `Source` + `Layer` = スタイルファイル

* 背景地図には、海洋、湖沼、河川、道路、線路、建物、その他いろいろなものが
  含まれており膨大となるため、  
  Layer はファイルとして出してしまっておくのが合理的。
* それが「スタイルファイル」。
* すなわちスタイルファイルには、その地図で使う
  1. 初期の `Source` リスト
  2. 初期の `Layer` 定義
  が含まれている。

```javascript
/* スタイルファイルとは名ばかりで `Source` の定義までここに入ってやがる！ */
```

```json
{
  "version": 8,
  "name": "Klokantech Basic JA",
  "center": [
    138.731389,
    35.362222
  ],
  "zoom": 5,
  "bearing": 0,
  "pitch": 0,
  "sources": {                 /*** HERE are the Sources ***/
    "openmaptiles": {
      "type": "vector",
      "tiles": ["https://hfu.github.io/jp1710_{z}/{x}/{y}.mvt"],
      "attribution": "(c) OpenStreetMap contributors (c) OpenMapTiles",
      "maxzoom": 14
    }
  },
  "glyphs": "https://hfu.github.io/noto-jp/{fontstack}/{range}.pbf",
  "layers": [
    {
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": "hsl(47, 26%, 88%)"
      }
    },                         /*** HERE are the Layers ***/
    {
      "id": "landuse-residential",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landuse",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Polygon"
        ],
        [
          "==",
          "class",
          "residential"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "hsl(47, 13%, 86%)",
        "fill-opacity": 0.7
      }
    },
    {
      "id": "landcover_grass",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landcover",
      "filter": [
        "==",
        "class",
        "grass"
      ],
      "paint": {
        "fill-color": "hsl(82, 46%, 72%)",
        "fill-opacity": 0.45
      }
    },
:           /* Continues */
```

* 引用元
  [ここ](https://hfu.github.io/jp1710/style.json)
  （[リポジトリ](https://github.com/hfu/jp1710/blob/master/style.json)）  
  from [gh-pagesで OSM 日本ベクトルタイル提供 - Qiita](https://qiita.com/hfu/items/e7c0318bba67827d4327)


### タイルのURL

```javascript
/* スタイルファイルとは名ばかりで `Source` の定義までここに入ってやがる！ */
```

* 従って、タイルの URL は、
  * 「JavaScript のコードの中」ではなく、
  * 「スタイルファイルの中」に、
  * `Source` の属性の一つとして、
  現れることになる。
* これは、Leaflet との違いであって。  
  JavaScript の中をいくら捜したって、  
  どのタイルを使っているかはわからない。

### Mapbox さんの商売

* スタイルファイルとして `mapbox:...` という表記ができる。  
  こう書くと Mapbox GL JS がよきに変換してくれる。  
  （そしてアクセスカウントが課金につながる）。
* こう書かれるともう中がどういう仕組みなのかまったくわからない。  
  （二重に隠蔽されてしまっているため）。
* スタイルファイルに `mapbox:` と書くだけであんなキレイなマップが  
  出てくるから、これがうっかり魔法か何かのように感じてしまう。  
  => これが、Mapbox さんのビジネス！


# まとめ

* Leaflet は `map` に 背景地図（`tileLayer`） や オーバレイ を `add` 。
* Mapbox は `Source` から `Layer` を構成。
  * 初期設定はスタイルファイル。
  * タイルの場所はスタイルファイルを見なければわからない。
