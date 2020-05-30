---
# Standard front matter stuff
layout: default
title: I am Muchen He
titlebar: Home
full_jquery: true

# Header
header:
  image: '/assets/img/avatar-new-small.jpg'
  color: transparent
  text:
  - A fourth(fifth) year EE student at UBC.
  - Currently studying and working on my Capstone project.
  - I previously worked at Intel, EA BioWare, and VitalMechanics.
  - <i class="text-muted" id="my-facts"></i>
---


<!-- <dl class="row dl-horizontal">
  {% for nav in site.data.navigation %}
  <dt class="col-md-2"><a href="{{ nav.url }}">{{ nav.text }}</a></dt>
  <dd class="col-md-10">{{ nav.desc }}</dd>
  {% endfor %}
</dl> -->


{% include contact %}