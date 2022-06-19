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
    <h2 class="handwrite center">☺ Hello!</h2>
    {% capture intro %}
    {% include intro.md %}
    {% endcapture %}
    {{ intro | markdownify }}

    <div class="my-3"></div>
    <h6>Contact</h6>
    <p>
        {% for item in site.data.contact.default %}
        {% unless item.show_homepage %}
        {% continue %}
        {% endunless %}
        {% if item.icon %}
        <i class="{{ item.icon }}"></i>
        {% else %}
        <i>{{ item.title }}</i>
        {% endif %}
        <a href="{{ item.link }}">{{ item.text }}</a>&nbsp;
        {% endfor %}
    </p>
</div>