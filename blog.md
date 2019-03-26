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
header_color: '#210'
subtitle: '&#x26A0 Under construction &#x26A0'
---

<div class="alert alert-info alert-dismissible fade show" role="alert">
    This page is in Beta.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<ul>
  {% for post in site.posts %}
    {% if post.published == false %}
    {% else %}
    <li>
      <h5><a href="{{ post.url }}">{{ post.title }}</a></h5>
      <p>{{ post.date }}</p>
      <p>{{ post.excerpt }}</p>
    </li>
    {% endif %}
  {% endfor %}
</ul>