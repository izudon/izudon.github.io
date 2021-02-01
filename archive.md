---
title: "Archive"
wikimedia:
  file: Egyptiska hieroglyfer, Nordisk familjebok.png
  cate: b/bb
  attr: Nordisk familjebok, Public domain, via Wikimedia Commons
wikimedia:
  file: Quebrada de Cafayate, Salta (Argentina).jpg
  cate: d/d3
  attr: travelwayoflife, CC BY-SA 2.0 <https://creativecommons.org/licenses/by-sa/2.0>, via Wikimedia Commons
---


{% for post in site.posts %}1. {{ post.date | date: "%Y-%m-%d" }}
  [{{ post.title }}]({{ post.url}})
{% endfor %}

