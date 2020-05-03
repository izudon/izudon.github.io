---
layout: top-page
map: portland_02
---

今朝の画像はポートランドの夜景です。

拡大縮小できますよ。今更ですけれども。


# 実家３日目




# うまい人はうまい

[![ばしくん＆翔平 ここにしか咲かない花 コブクロ](https://img.youtube.com/vi/ld_sj7BGTGI/0.jpg)](https://www.youtube.com/watch?v=ld_sj7BGTGI)

[![MELOGAPPA 蕾 コブクロ](https://img.youtube.com/vi/WyzA4Fk-b7k/0.jpg)](https://www.youtube.com/watch?v=WyzA4Fk-b7k)

[![くねともくねくね ESCAPADE - Official髭男dism](https://img.youtube.com/vi/LG0iw0aKJHA/0.jpg)](https://www.youtube.com/watch?v=LG0iw0aKJHA)


# 昨日

* 画像をタイルに切るツールを仕上げた。
* アルゴリズムは正しかったが ImageMagick の仕様で２カ所ほど
  ハマりポイントを踏んでしまっていた。

## PNG の相対位置メモリー

*  `-crop` で PNG に切り出すと PNG は元の画像からどこを切り取ったかという
   相対位置を覚えていて、さらに `-crop` する際、切り出しの位置指定が、
   切り取った画像の左上からではなく、元画像の左上からの座標として、
   解釈されてしまう。
   * 相対位置を忘れさせるためには `-crop` の際 `+repage` という
	 オプションを使う。
		* from [ImageMagick の画像 crop - Qiita](https://qiita.com/yoya/items/62879e6e03d5a70eed09)

## PNG の透過色変換

* PNG を JPEG に `convert` する際に、`-background <color>` を指定していても
  透過色が黒にされてしまう問題。
  * `-resize` などの「塗り」を必要とする変換オプションが必要であるとの
	ことであった。
  * [透明度を含む画像を JPEG に変換する時の背景色](https://blog.awm.jp/2016/01/25/flatten/)


# 今日

* もうすこしいろいろ書きたいことがあるので、  
  夕方頃もう一回アップするかもしれません。



# 今朝の感謝ｘ３

1. 食事と寝る場所を提供くださっている実家の皆様ありがとう。
2. 素敵な演奏を公開してくださっている YouTuber の皆様ありがとう。
3. ImageMagick のハマりポイントを知識として公開してくださっている
   皆様ありがとう。
