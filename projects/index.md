---
# Standard front matter stuff
author: Muchen He
layout: default

title: Projects
nav_active: /projects
---

<style>
.p-item img, .p-item-sm img { width: 100%; height: 240px; object-fit: cover; max-height: 400px; border-radius: 1em; }
.p-item p.tech, .p-item-sm p.tech { line-height: 1.15; }
.p-item p { margin-bottom: 0.6em; }
.p-item-sm p { margin-bottom: 0.6em; font-size: 14px;}
@media (min-width: 784px) {
	.p-item img { height: initial; }
	.p-item-sm img { height: 135px; }
}
</style>

# ⭐️
{: .display-1}

This page contains projects that I've created or contributed to. They are ordered reverse-chronologically. (This page also needs to be updated ._.)

<div class="row">
{% assign projects = site.data.projects | sort: "dates.end" | reverse %}
{% for project in projects %}
{% if project.worthy %}
<div class="p-item col-12 my-3 py-2">
	{% if project.thumbnail %}<img src="{{ project.thumbnail }}" alt="{{ project.name }} thumbnail" loading="lazy" class="neuemorph-shadow mb-2">{% else %}<img src="/assets/img/grey.jpg" class="neuemorph-shadow mb-2">{% endif %}
	<p class='mt-2'><strong>{{ project.name }} ({{ project.dates.end | date: "%Y" }})</strong></p>
	<p>{{ project.description }}</p>
	<p title="Tech used" class="text-muted tech"><small>{{ project.tech | join: ', ' }}</small></p>
	{% for link in project.links %}
	<a class="btn btn-xs btn-primary" href="{{ link[1] }}">{{ link[0] | capitalize }}</a>
	{% endfor %}
</div>
{% endif %}
{% endfor %}
</div>

---

## Other Projects

Here are some more (smaller) projects that I've done through out the years.

<div class="row">
{% for project in projects %}
{% unless project.worthy %}
<div class="p-item-sm col-md-4 my-3 py-2">
	{% if project.thumbnail %}<img src="{{ project.thumbnail }}" alt="{{ project.name }} thumbnail" loading="lazy" class="neuemorph-shadow mb-1">{% else %}<img src="/assets/img/grey.jpg" class="neuemorph-shadow mb-1">{% endif %}
	<p class='mt-2'><strong>{{ project.name }} ({{ project.dates.end | date: "%Y" }})</strong></p>
	<p>{{ project.description }}</p>
	<p title="Tech used" class="text-muted tech">{{ project.tech | join: ', ' }}</p>
	{% for link in project.links %}
	<a class="btn btn-xs btn-primary" href="{{ link[1] }}">{{ link[0] | capitalize }}</a>
	{% endfor %}
</div>
{% endunless %}
{% endfor %}

</div>