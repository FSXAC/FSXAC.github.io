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
header_color: '#321'
subtitle: '&#x26A0 Under construction &#x26A0'
---

<div class="alert alert-info alert-dismissible fade show" role="alert">
    This page is in Beta.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<!-- {% assign postsByYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'"  %}
{% for year in postsByYear %}
  <h2 id="{{ year.name | slugify }}" class="archive__subtitle">{{ year.name }}</h2>
  {% for post in year.items %}
    {% include archive-single.html %}
  {% endfor %}
{% endfor %} -->

<ul>
  {% for post in site.posts %}
    <li>
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      <p>{{ post.excerpt }}</p>
    </li>
  {% endfor %}
</ul>