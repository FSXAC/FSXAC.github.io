---
layout: default
title: Blog

nav_active: /blog
permalink: /blog
---

<style>
.teaser {
  width: 100%;
  height: 375px;
  background-color: #fff;
  background-size: cover;
  background-position: center; 
  border-radius: var(--round-radius);
  padding-bottom: 3px;
}
</style>

# ☕️
{: .display-1 .center }

Occasional memory dump of various things. The <a href="/archive">Archive</a> lists all blog posts in reverse-chronological order.

{% for post in site.posts %}
<div class="post-entry py-4">
  <p class="mb-1"><small>{{ post.date | date: "%Y-%m-%d" }}</small></p>
  <a href="{{ post.url }}">
  <h6>{{ post.title }}</h6>
  <div class="neuemorph-shadow teaser mb-2 mr-2" style="background-image: url({{ post.header.teaser | default: '/assets/img/grey.jpg' }}) "></div>
  </a>
    <p class="mt-4">{{ post.excerpt | strip_html }}
      &nbsp;
      <a href="{{ post.url }}">Read&nbsp;more&nbsp;&rarr;</a>
    </p>
</div>
{% endfor %}
