/*jshint esversion: 6*/

var $pc = $('#projectContainer');

var projTemplate = `
<div class="col-lg-2 col-md-3 col-sm-4 col-xs-12 proj-block">
<img class="proj-cover" src="{img}">
<h3 class="proj-title">{title}</h3>
<p>{desc}</p>
</div>
`;

function readProjects() {
    loadJSON(function(response) {
        displayProjects(response);
    });
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'projects.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == '200') {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function displayProjects(projs) {
    projects = JSON.parse(projs).projects;
    console.log(projects);

    var htmlOut = '';
    for (var i = 0, l = projects.length; i < l; i++) {
        htmlProj = projTemplate
        .replace('{img}', projects[i].thumbnail)
        .replace('{title}', projects[i].name)
        .replace('{desc}', projects[i].description);
        htmlOut += htmlProj;
        console.log(htmlProj);
    }
    $pc.html(htmlOut);
}

readProjects();