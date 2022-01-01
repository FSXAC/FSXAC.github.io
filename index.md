---
layout: default
title: Homepage
show_footer: false
---

<style>
.decorative-bg {
    z-index: -1;
    position: absolute;
    width: 100%;
}
</style>
<script src="https://kit.fontawesome.com/c83e37f840.js" crossorigin="anonymous"></script>
<div class="row my-5">
    <!-- <div class="col-md-4"> -->
    <h2 class="handwrite center">☺ Hello!</h2>
    <!-- </div>
    <div class="col"> -->
    {% capture intro %}
    {% include intro.md %}
    {% endcapture %}
    {{ intro | markdownify }}

    <div class="my-3"></div>
    <h6>Contact</h6>
    <p>
        {% for item in site.data.contact.default %}
        {% if item.icon %}
        <i class="{{ item.icon }}"></i>
        {% else %}
        <i>{{ item.title }}</i>
        {% endif %}
        <a href="{{ item.link }}">{{ item.text }}</a>&nbsp;
        {% endfor %}
    </p>
    <!-- </div> -->
</div>