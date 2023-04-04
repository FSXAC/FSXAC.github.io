---
layout: default
title: worknotes
---

| title |
| ----- |
{% for post in site.work_notes_2023 %}| [{{ post.title }}]({{ post.url }}) |
{% endfor %}

<!-- <p><a href="{{ post.url }}">{{ post.title }}</a><p> -->