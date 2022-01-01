---
layout: default
title: Blog

nav_active: /blog
permalink: /blog
---

<style>
img.teaser {
  width: 100%;
  max-height: 350px;
  background-color: #fff;
  object-fit: cover;
  border-radius: 16px;

}
@media (min-width: 768px) {
  img.teaser {
    max-height: 200px;
  }
}
</style>

# ☕️
{: .display-1 }

Occasional memory dump of various things. The <a href="/archive">Archive</a> lists all blog posts in reverse-chronological order.

{% for post in site.posts %}
<div class="post-entry py-4">
<div class="row gx-5">
  <div class="col-md-4">
    <a href="{{ post.url }}"><img class="teaser neuemorph-shadow mb-2 mr-2" src="{{ post.header.teaser | default: '/assets/img/logo2019-128.jpg' }}" alt="..."></a>
  </div>
  <div class="col-md-8">
    <small>{{ post.date | date: "%Y-%m-%d" }}</small>
    <h2>{{ post.title }}</h2>
    <p>{{ post.excerpt | strip_html }}
      <br>
      <a href="{{ post.url }}">Read more &rarr;</a>
    </p>
  </div>
</div>
</div>
{% endfor %}
