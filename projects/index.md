---
# Standard front matter stuff
author: Muchen He
layout: default

title: Projects
nav_active: /projects
---

<style>
.p-item div.img, .p-item-sm div.img { height: 375px; background-position: center;  background-size: cover; border-radius: var(--round-radius); }
.p-item-sm div.img { height: 200px; background-size: cover; border-radius: var(--round-radius); }
.p-item p.tech, .p-item-sm p.tech { line-height: 1.15; }
.p-item p { margin-bottom: 0.6em; }
.p-item-sm p { margin-bottom: 0.6em; font-size: 14px;}
.p-item-sm.row { margin-left: 0; margin-right: 0; }
</style>

# ⭐️
{: .display-1 .center }

This page contains projects that I've created or contributed to. They are ordered reverse-chronologically.

<div>
{% assign projects = site.data.projects | sort: "dates.end" | reverse %}
{% for project in projects %}
{% if project.worthy %}
<div class="p-item my-3 py-2">
	<div class="neuemorph-shadow img mb-2" style="background-image: url({% if project.thumbnail %}{{ project.thumbnail }}{% else %}/assets/img/grey.jpg{% endif %});"></div>
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

<div>
{% for project in projects %}
{% unless project.worthy %}
<div class="p-item-sm row my-3 py-2">
	<div class="neuemorph-shadow img mb-2 col-6" style="background-image: url({% if project.thumbnail %}{{ project.thumbnail }}{% else %}/assets/img/grey.jpg{% endif %});"></div>
	<div class="col-6">
	<p><strong>{{ project.name }} ({{ project.dates.end | date: "%Y" }})</strong></p>
	<p>{{ project.description }}</p>
	<p title="Tech used" class="text-muted tech">{{ project.tech | join: ', ' }}</p>
	{% for link in project.links %}
	<a class="btn btn-xs btn-primary" href="{{ link[1] }}"><small>{{ link[0] | capitalize }}</small></a>
	{% endfor %}
	</div>
</div>
{% endunless %}
{% endfor %}

</div>