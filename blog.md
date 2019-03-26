---
# Standard front matter stuff
author: Muchen He
date: 2019-03-23
layout: default
title: Blog

# Custom stuff
# Title
titlebar: Blog

# Nav selector
nav_active: /blog

# Header
header:
  color: '#210'
  text:
  - '&#x26A0 Under construction &#x26A0'
---

<style>
.media-body {
  border-top: 1px dotted {{ page.header.color }};
}
.media-left {
  width: 192px;
  height: 108px;
}
img.media-object {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>


{% for post in site.posts %}
  <div class="media my-3">
      <div class="media-left media-top mr-3 pt-1">
          {% if post.header.teaser %}
          <a href="{{ post.url }}"><img class="media-object" src="{{ post.header.teaser }}" alt="..."></a>
          {% endif %}
      </div>
      <div class="media-body pt-1">
          <h3 class="media-heading"><a href="{{ post.url }}">{{ post.title }}</a></h3>
          <p>{{ post.date | date: "%Y-%m-%d" }}</p>
          <p>{{ post.excerpt }}</p>
          <a href="{{ post.url }}">Read more</a>
      </div>
  </div>
  {% endfor %}