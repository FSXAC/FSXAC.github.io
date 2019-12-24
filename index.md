---
# Standard front matter stuff
author: Muchen He
date: 2019-03-23
layout: default
title: I am Muchen He

# Custom stuff
# Title
titlebar: Home

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

## Index

<dl class="row dl-horizontal">
  {% for nav in site.data.navigation %}
  <dt class="col-md-2"><a href="{{ nav.url }}">{{ nav.text }}</a></dt>
  <dd class="col-md-10">{{ nav.desc }}</dd>
  {% endfor %}
</dl>

## Contact

<dl class="row dl-horizontal">
  <dt class="col-md-2">E-mail</dt>
  <dd class="col-md-10"><a href="mailto:i@muchen.ca">i@muchen.ca</a></dd>
  <dt class="col-md-2">GitHub</dt>
  <dd class="col-md-10"><a href="https://www.github.com/FSXAC">FSXAC</a></dd>
  <dt class="col-md-2">LinkedIn</dt>
  <dd class="col-md-10"><a href="https://www.linkedin.com/in/muchen-he-6a3716b3/">Link</a></dd>
</dl>

<a class="btn btn-secondary btn-xs mt-3" data-toggle="collapse" href="#social-media-collapse" role="button" aria-expanded="false" aria-controls="collapseExample">Show social media links &#x1f174;</a>
<div class="collapse" id="social-media-collapse">
  <h2>Social Media</h2>
  <dl class="row dl-horizontal">
    <dt class="col-md-2">Instagram</dt>
    <dd class="col-md-10"><a href="https://www.instagram.com/muchen.he/">muchen.he</a></dd>
    <dt class="col-md-2">TikTok</dt>
    <dd class="col-md-10"><a href="https://www.tiktok.com/@muchen.he">@muchen.he</a></dd>
  </dl>
</div>

<script src="/assets/js/facts.js"></script>
<script>
makeRandomMessage('my-fact', 'my-facts')
</script>