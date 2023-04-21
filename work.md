---
layout: default
title: worknotes
---

{% assign pages = site.pages | where_exp: 'page', 'page.title contains "WW"' %}

| Date | Title | 
| ----- | ---- |
{% for post in pages %}| {{ post.date }} | [{{ post.title }}]({{ post.url }}) |
{% endfor %}

<!-- <p><a href="{{ post.url }}">{{ post.title }}</a><p> -->