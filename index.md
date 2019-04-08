---
# Standard front matter stuff
author: Muchen He
date: 2019-03-23
layout: default
title: I am Muchen He.

# Custom stuff
# Title
titlebar: Home

# Header
header:
  image: '/assets/img/avatar-new-small.jpg'
  text:
  - I'm a fourth year Electrical Engineering at The University of British Columbia. Currently on an 8-month co-op term Intel of Canada as FPGA Emulation Platform intern. I've previously worked at Electronic Arts - BioWare and VitalMechanics.
---

## Index

<dl class="row dl-horizontal">
    {% for nav in site.data.navigation %}
    <dt class="col-md-2"><a href="{{ nav.url }}">{{ nav.text }}</a></dt>
    <dd class="col-md-10">{{ nav.desc }}</dd>
    {% endfor %}
</dl>

## Contacts

<dl class="row dl-horizontal">
    <dt class="col-md-2">E-mail</dt>
    <dd class="col-md-10"><a href="mailto:i@muchen.ca">i@muchen.ca</a></dd>
    <dt class="col-md-2">GitHub</dt>
    <dd class="col-md-10"><a href="https://www.github.com/FSXAC">FSXAC</a></dd>
    <dt class="col-md-2">LinkedIn</dt>
    <dd class="col-md-10"><a href="https://www.linkedin.com/in/muchen-he-6a3716b3/">Link</a></dd>
</dl>