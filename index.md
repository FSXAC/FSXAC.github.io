---
layout: default
title: Homepage
# show_footer: false
---

<style>
.decorative-bg {
    z-index: -1;
    position: absolute;
    width: 100%;
}
</style>
<script src="https://kit.fontawesome.com/c83e37f840.js" crossorigin="anonymous"></script>

<div class="my-5"></div>

# Hello!

My name is Muchen, and welcome to my corner on the internet; here you will find my blogs, course notes, and projects.

I'm a graduate student pursuing a Masters in Applied Science at the [UBC](https://www.ubc.ca), advised by [Prof. Mieszko Lis](http://mieszko.ece.ubc.ca/).
My current work involves computer architecture security and performance simulation using the [gem5](https://www.gem5.org) simulator.

Along with years of teaching assistance at UBC since 2017, my experiences include: UI/UX programming with Frostbite engine and C++ at *[EA - BioWare](https://www.bioware.com)*, FPGA dev-tools development at *[Intel - NSG](https://www.intel.ca/content/www/ca/en/homepage.html)*, and app-development at *[Vital Mechanics](https://www.vitalmechanics.com)*. See [CV](cv) for more details.

## Contacts

<p>
{% for item in site.data.contacts.default %}
{% unless item.show_homepage %}
{% continue %}
{% endunless %}
{% if item.icon %}
<!-- <i class="{{ item.icon }}"></i> -->
<a class="btn" style="min-width: 3em; margin-right: .5em" href="{{ item.link }}"><i class="{{ item.icon }}"></i></a>
{% else %}
<i>{{ item.title }}</i>
{% endif %}
<!-- <a href="{{ item.link }}">{{ item.text }}</a>&nbsp; -->


{% endfor %}
</p>

<!-- 
<div class="row my-5">
# 
    <h2>☺ Hello!</h2>
    {% capture intro %}
    
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
</div> -->