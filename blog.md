---
layout: default
title: Blog

nav_active: /blog
permalink: /blog

header:
  color: '#FC2'
  gradient: 'linear-gradient(90deg, #FDBB2D 0%, #22C1C3 100%)'
  text_color: black
  text: Occasional memory dump.
---

<style>
img.teaser {
  width: 100%;
  max-height: 350px;
  background-color: #fff;
  object-fit: cover;
}
@media (min-width: 768px) {
  img.teaser {
    max-height: 200px;
  }
}
</style>

# ☕️
{: .display-1}

Occasional memory dump of various things. 

<a href="/archive" class="btn btn-default btn-outline-primary">Archive</a>

{% for post in site.posts %}
<div class="post-entry py-4">
<div class="row">
  <div class="col-md-4">
    <a href="{{ post.url }}"><img class="teaser shadow mb-2 mr-2" src="{{ post.header.teaser | default: '/assets/img/logo2019-128.jpg' }}" alt="..."></a>
  </div>
  <div class="col-md-8">
    <small>{{ post.date | date: "%Y-%m-%d" }}</small>
    <h2>{{ post.title }}</h2>
    <p>{{ post.excerpt | strip_html }}
      <a href="{{ post.url }}">Read more &rarr;</a>
    </p>
  </div>
</div>
</div>
{% endfor %}
