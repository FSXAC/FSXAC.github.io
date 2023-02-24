---
layout: default
title: Documents
description: A collection of course notes and more
nav_active: /documents
permalink: /documents
---

<style>	
	#searchField {
		/* border: none; */
		/* background-color: transparent; */
		/* border-bottom: 1px dotted var(--text-color); */
		color: var(--text-color);
		margin-top: .8em;
		border: 1px solid black;
	}
	#searchFieldIcon { font-size: 1.25em; }
	
	.card { width: 100%; margin-bottom: 1em; border: none; background: transparent; }
	.card-body { padding: 0; }
	.card-body .list-group .list-group-item {
		border: none;
		padding: 0;
		white-space: nowrap;
		margin: 0;
		background: transparent;
		color: inherit;
	}
	.card-body .list-group .list-group-item .btn-entry {
		margin-top: .1em;
		margin-bottom: .1em;
	}

	.card-gutter-sizer { width: 0; }
	@media screen and (min-width: 992px) {
		.card { width: 49%; }
		.card-gutter-sizer { width: 2%; }
	}
	@media screen and (min-width: 768px) and (max-width: 992px) {
		.card { width: 98%; }
		.card-gutter-sizer { width: 1%; }
	}
	
	.flag-draft { text-decoration: line-through; }
	</style>

# Notes and Docs

This page contains my notes/documents/reports for the courses I've taken.
I try to fill in as much as possible but there is a lot missing.
Oh and I'm only human and there may be mistakes; so only use content from this page as reference material. You've been warned.

<span id="searchFieldIcon">&#128270;&nbsp;</span><input type="text" id="searchField" onkeyup="searchFunc()" placeholder="Search...">

{% for category in site.data.documents %}
<section>
<h2 class='mt-4'>{{ category.category }}</h2>
<div class="card-grid">
<div class="card-gutter-sizer"></div>
{% assign courses = category.courses | sort: 'course_num' %}
{% for course in courses %}
	{% if course.entries %}
	<div id="{{ course.course_num | replace: ' ', '-'}}" class="card p-0 col-6">
	<div class="box me-3 mb-1 card-header">
		<div style="float: left; border-right: 1px solid #bbb;" class="pe-2 me-2"><span style="font-size: 2em;">{{ course.emoji }}</span></div>
		<p class="mb-0"><b>{{ course.course_name }}</b></p>
		<small>{{ course.course_num | upcase }}</small>
	</div>
	<div class="card-body ps-1 mb-4">
		<ul class="list-group list-group-flush">
		{% for entry in course.entries %}
		<li class="list-group-item text-truncate">
			{% if entry.group %}
				{{ entry.title }}
				{% for enum_entry in entry.group %}
					<a class="btn btn-xs btn-entry" href="{{ enum_entry.link }}">{{ enum_entry.enum }}</a>
				{% endfor %}
			{% else %}
				{% if entry.flag == 'draft' %}
					<a href="{{ entry.link }}" class="flag-draft" title="{{ entry.flag }} - {{ entry.title }}" disabled>{{ entry.title }}</a>
				{% elsif entry.flag == 'new' %}
					<a href="{{ entry.link }}" class="flag-new" title="{{ entry.flag }} - {{ entry.title }}">{{ entry.title }}</a>
				{% elsif entry.flag %}
					<a href="{{ entry.link }}" class="flag-other" title="{{ entry.flag }} - {{ entry.title }}">{{ entry.title }}</a>
				{% else %}
					<a href="{{ entry.link }}" title="{{ entry.title }}">{{ entry.title }}</a>
				{% endif %}
			{% endif %}
		</li>
		{% endfor %}
		</ul>
	</div>
	</div>
	{% endif %}
{% endfor %}
</div>
</section>
{% endfor %}

{% include jquery.html %}
<script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
<script>
$('.card-grid').masonry({
    itemSelector: '.card',
    gutter: '.card-gutter-sizer',
    percentPosition: true
});

function searchFunc() {
	let searchInput = document.getElementById('searchField');
	let searchVal = searchInput.value.toLowerCase();

	let allCards = document.getElementsByClassName('card');
	for (let i = 0; i < allCards.length; i++) {

		let cardHeader = allCards[i].getElementsByClassName('card-header')[0];

		if (cardHeader.innerHTML.toLowerCase().includes(searchVal)) {
			allCards[i].style.display = 'flex';
		} else {
			allCards[i].style.display = 'none';
		}
	}

	// check if card grid is empty
	let cardGrids = document.getElementsByClassName('card-grid');
	for (let i = 0; i < cardGrids.length; i++) {
		let cards = cardGrids[i].getElementsByClassName('card');
		let display = false;
		for (let j = 0; j < cards.length; j++) {
			if (cards[j].style.display !== 'none') {
				display = true;
			}
		}
		if (display) {
			cardGrids[i].previousElementSibling.style.display = 'block'
			cardGrids[i].style.display = 'block';
		} else {
			cardGrids[i].previousElementSibling.style.display = 'none'
			cardGrids[i].style.display = 'none';
		}
	}

	// Reload masonry layout
	$('.card-grid').masonry('layout');
}

$(document).ready(function() {
	let regex = /\/documents\/?#\?(.+)/g;
	let url = window.location.href;
	let matches = regex.exec(url);
	if (matches) {
		document.getElementById('searchField').value = matches[1];
		searchFunc()
	}
});
</script>
