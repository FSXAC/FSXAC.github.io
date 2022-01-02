---
title: "Noted: Lightroom CC Doesn't Use GPU on Export"
date: 2018-06-28
categories: Noted

author: Muchen He
layout: post
nav_active: /blog
tags:
  - adobe
  - lightroom
image: /assets/blog/teaser/lightroom.jpg
header:
  overlay_image: /assets/blog/default.jpg
  overlay_filter: 0.4

published: false
---

Noted:

Apparently Adobe Lightroom doesn't use GPU, like, at all.

<!-- excerpt -->

While developing photos, it makes no difference having hardware acceleration on or off.

On RAW export, it makes no difference having hardware acceleration on or off.

I didn't know that.

Apparently it only makes a difference when working on a ultra high-res monitor (4k or 5k at least). This make sense because hardware acceleration is good at pumping pixels to the screen, but not suited for sequencially saving developed photos to file. I'm stupid for not realizing this sooner, seem so obvious.

Good to know.

Noted.
