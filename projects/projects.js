/*jshint esversion: 6*/

var $pc = $('#projectContainer');

var PT = {
    opening: '<div class="col-lg-2 col-md-3 col-sm-4 col-xs-12 proj-block">',
    closing: '</div>',
    thumbnail: '<img class="proj-cover" src="{img}">',
    title: '<h3 class="proj-title">{title}</h3>',
    desc: '<p>{desc}</p>',
    link: '<a href="{url}" class="btn btn-default btn-xs proj-btn">{txt}</a>'
}

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
        // compose the html for each project block here
        currProj = projects[i];
        htmlProj = PT.opening;
        
        if (currProj.thumbnail != null) {
            htmlProj += PT.thumbnail.replace('{img}', currProj.thumbnail);
        }

        htmlProj += PT.title.replace('{title}', currProj.name);
        htmlProj += PT.desc.replace('{desc}', currProj.description);

        if (currProj.website != null) {
            htmlProj += PT.link
            .replace('{url}', currProj.website)
            .replace('{txt}', 'Webpage');
        }

        if (currProj.report != null) {
            htmlProj += PT.link
                .replace('{url}', currProj.report)
                .replace('{txt}', 'Report');
        }

        htmlProj += PT.closing;

        htmlOut += htmlProj;
    }
    $pc.html(htmlOut);
}

readProjects();