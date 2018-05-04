// Container reference
var $container;

// Project template
var replaceables = {
    year: '{{year}}',
    blocks: '{{blocks}}',
    block: '{{block}}',
    color: '{{color}}',
    icon: '{{icon}}',
    title: '{{title}}',
    date: '{{date}}',
    img: '{{img}}',
    src: '{{src}}',
    desc: '{{desc}}',
    extra: '{{extra}}',
    href: '{{href}}',
    text: '{{text}}'
};

var template = {

    // @year: year of the project date
    yearHeader: '<div id="proj' + replaceables.year + '" class="timeline-year"><a href="#main"><h2>' + replaceables.year + '</h2></a></div>',

    // @blocks: html of all project timeline blocks
    yearCont: '<section id="blocks' + replaceables.year + '" class="timeline timeline-container"></section>',

    // @block: inner html of each project
    blockCont: '<div class="timeline-block">' + replaceables.block + '</div>',

    // @color: icon background color
    // @icon: icon
    projHead: '<div class="timeline-icon timeline-icon-' + replaceables.color + '"><img src="img/icons/' + replaceables.icon + '"></div>',

    // @title: project title
    // @date: project date
    // @img: optional picture of the project
    // @desc: project description
    // @extra: extra html for more things (buttons, etc)
    projBody: '<div class="timeline-body"><h2>' + replaceables.title + '</h2><p class="timeline-date">' + replaceables.date + '</p>' + replaceables.img + '<p class="text-muted">' + replaceables.desc + '</p>' + replaceables.extra + '</div>',

    // @src: image source
    projImg: '<img src="' + replaceables.src + '">',

    // @href: link that the button leads to
    // @text: link text
    button: '<a class="btn btn-sm btn-outline-secondary" href="' + replaceables.href + '">' + replaceables.text + '</a>'
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
};

function setContainer(container) {
    if (container !== undefined) {
        $container = container;
    }
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

function readProjects() {
    loadJSON(function(response) {
        if ($container !== undefined && $container !== null) {
            parseProjects(JSON.parse(response).projects);
        }
    });
}

// Given a JSON that contains all the projects,
// Edits html directly in here, returns nothin
function parseProjects(pjs) {
    // String html for each year
    var yearHtmls = {};
    var outHtml = '';

    // DELETION
    // // Sort projects into year bins
    // for (var i = 0, n = pjs.length; i < n; i++) {
    //     yearHtmls = parseSingleProject(pjs[i], yearHtmls);
    // }
    // // Render HTML for different years
    // Object.keys(yearHtmls).forEach(function(key, index) {
    //     outHtml += template.yearHeader.replace(new RegExp(replaceables.year, 'g'), key) + template.yearCont.replace(replaceables.blocks, yearHtmls[key]);
    // });

    var years = getYears(pjs);
    $container.html(makeYearContainers(years));

    // For each year, render individual project html
    for (var i = 0, n = pjs.length; i < n; i++) {
        var projectYear = getEndYear(pjs[i]);
        var projectHtml = renderProjectToHtml(pjs[i]);

        var yearIden = '#blocks' + projectYear;
        $(yearIden).prepend(projectHtml);
    }
}


// Returns a set of years that all projects belong to
function getYears(pjs) {
    years = [];
    for (var i = 0, n = pjs.length; i < n; i++) {
        var year = getEndYear(pjs[n]);
        if (year in years) {
            continue;
        } else {
            years.push(year);
        }
    }
    return years;
}

// Returns html for year containers and its headers
function makeYearContainers(years) {
    var outHtml = '';
    for (var i = 0, n = years.length; i < n; i++) {
        outHtml += template.yearHeader.replace(new RegEx(replaceables.year, 'g'), years[i]);
        outHtml += template.yearCont.replace(replaceables.year, years[i]);
    }
    return outHtml;
}

// Parse a single project and add it to the year html bins
// function parseSingleProject(project, yearHtmls) {
//     var year = getEndYear(project);
//     if (!(year in yearHtmls)) {
//         yearHtmls[year] = '';
//     } else {
//         yearHtmls[year] += renderProjectToHtml(project);
//     }

//     return yearHtmls;
// }

// Render the html for a single project
function renderProjectToHtml(project) {
    var html = template.blockCont;
    var h_header = template.projHead;
    var h_body = template.projBody;
    var h_extra = '';

    // Fill in the blanks

    // Icon
    var h_color = '';
    var h_icon = '';
    switch (project.type) {
        case 'code':
            h_color = templateColor.sky;
            h_icon = templateIcon.code;
            break;
        case 'mech':
            h_color = templateColor.yellow;
            h_icon = templateIcon.tools;
            break;
        case 'elec':
            h_color = templateColor.blue;
            h_icon = templateIcon.chip;
            break;
        case 'design':
            h_color = templateColor.green;
            h_icon = templateIcon.cube;
            break;
        default:
            h_color = templateColor.red;
            h_icon = '';
            console.error('Project type error: ', project);
            break;
    }
    h_header = h_header.replace(replaceables.color, h_color);
    h_header = h_header.replace(replaceables.icon, h_icon);

    // Title
    h_body = h_body.replace(replaceables.title, project.name);

    // Date
    if (project.ongoing) {
        h_body = h_body.replace(replaceables.date, project.dates.end + ' (on-going)');
    } else {
        h_body = h_body.replace(replaceables.date, project.dates.end);
    }

    // Image
    if (project.thumbnail !== null && project.thumbnail !== '') {
        h_body = h_body.replace(replaceables.img,
            template.projImg.replace(replaceables.src, project.thumbnail));
    } else {
        h_body = h_body.replace(replaceables.img, '');
    }

    // Description
    h_body = h_body.replace(replaceables.desc, project.description);

    // TODO: details
    // TODO: tech
    // TODO: scope
    // TODO: contributors

    // Extra links
    Object.keys(project.links).forEach(function (key, index) {
        h_extra += template.button
            .replace(replaceables.href, project.links[key])
            .replace(replaceables.text, capitalizeString(key));
    });
    h_body = h_body.replace(replaceables.extra, h_extra);

    // Pack all HTML together
    return html.replace(replaceables.block, h_header + h_body);
}

// Returns the end year of the project
// Returns 0 if project doens't have valid date
function getEndYear(project) {
    if (project.dates.end !== undefined) {
        var d = new Date(project.dates.end);
        return String(d.getFullYear());
    } else {
        console.error('No date: ', project);
        return '0';
    }
}

// Capitalizes the first character in a string
function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}