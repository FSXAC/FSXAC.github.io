---
# Standard front matter stuff
layout: default
title: I am Muchen He
titlebar: Home
full_jquery: true

# Header
# header:
#   image: '/assets/img/avatar-new-small.jpg'
#   color: transparent
#   text:
#   - A fourth(fifth) year EE student at UBC.
#   - Currently studying and working on my Capstone project.
#   - I previously worked at Intel, EA BioWare, and VitalMechanics.
#   - <i class="text-muted" id="my-facts"></i>
---

<style>
#headshot-img {
    background-image: url("/assets/img/light-512.jpeg");
    background-size: cover;
    width: 100%;
    max-width: 256px;
    margin-bottom: 2em;
}
#headshot-img::after {
    content: "";
    display: block;
    padding-bottom: 100%;
}
@media (prefers-color-scheme: dark) {
    #headshot-img {
        background-image: url("/assets/img/dark-512.jpeg");
    }
}
</style>

<div class="row">
    <div class="col-md-4">
        <div id="headshot-img"></div>
    </div>
    <div class="col-md-8">
    <h1 style="font-size: 800%; font-weight: bold">Hi,</h1>
    {% capture intro %}
    {% include intro.md %}
    {% endcapture %}
    {{ intro | markdownify }}
    </div>
</div>

<div class="my-5"></div>

{% include contact %}
