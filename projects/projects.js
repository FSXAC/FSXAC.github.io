// Container reference
var $container = undefined;

// Project template
var template = {

    // @year: year of the project date
    yearHeader: '<div id="p{{year}} class="timeline-year"><a href="#main"><h2>{{year}}</h2></a></div>',

    // @blocks: html of all project timeline blocks
    yearCont: '<section class="timeline timeline-container">{{blocks}}</div>',

    // @block: inner html of each project
    blockCont: '<div class="timeline-block">{{block}}</div>',

    // @color: icon background color
    // @icon: icon
    projHead: '<div class="timeline-icon timeline-icon-{{color}}"><img src="img/icons/{{icon}}"></div>',

    // @title: project title
    // @date: project date
    // @img: optional picture of the project
    // @desc: project description
    // @extra: extra html for more things (buttons, etc)
    projBody: '<div class="timeline-body"><h2>{{title}}</h2><p class="timeline-date">{{date}}</p>{{img}}<p class="text-muted">{{desc}}</p>{{extra}}</div>',

    // @href: link that the button leads to
    // @text: link text
    button: '<a class="btn btn-sm btn-outline-secondary" href="{{href}}">{{text}}</a>'
};

var templateColor = {
    green: 'success',
    yellow: 'warning',
    blue: 'primary',
    sky: 'info',
    red: 'danger'
};

var templateIcon = {
    chip: 'chip.svg',
    code: 'code.svg',
    cube: 'cube.svg',
    tools: 'tools.svg'
}

function setContainer(container) {
    if (container != undefined) {
        $container = container;
    }
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'projects.json', true);
    xobj.onreadystatechange = function() {
        callback(xobj.responseText);
    }
    xobj.send(null);
}

function readProjects() {
    loadJSON(function(response) {
        parseProjects(JSON.parse(response).projects);
    });
}

function parseProjects(pjs) {

    // String html for each year
    var yearHtmls = {};

    for (var i = 0, n = pjs.length; i < n; i++) {

    }
}