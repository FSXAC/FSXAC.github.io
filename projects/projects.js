// Container reference
var $container;

// Project template replaceable keys
var rp = {
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

/* Set global variable $container to reference the DOM element
 * @param container JQuery object of the DOM
 */
function setContainer(container) {
    if (container !== undefined) {
        $container = container;
    }
}

/* Loads a JSON object from file or path
 * @param path The path to the JSON file
 * @param callback The callback function for when JSON file is obtained
 */
function loadJSON(path, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == '200') {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

/* Reads projects.json and populates HTML
 */
function readProjects() {
    loadJSON('projects.json', function(response) {
        if ($container !== undefined && $container !== null) {
            parseProjects(JSON.parse(response).projects);
        }
    });

    return true;
}

/* Render a given list of projects to HTML and add to DOM
 * @param pjs The List of projects given
 */
function parseProjects(pjs) {
    // Get a list of years
    var yearsList = listProjectYears(pjs);
    var yearsMapData = yearsList;
    var yearsMap;

    // For each year, add their containers
    for (var i = 0, n = yearsMapData.length; i < n; i++) {
        var year = yearsMapData[i];
        var yearId = genId('year', year);

        yearsMapData[i] = [year, yearId];

        // Create HTML
        renderYearContainer(year, {
            id: yearId
        });
    }

    // For each project, add to their year containers
    for (var p = 0, l = pjs.length; p < l; p++) {
        renderProject(pjs[p], {
            // Options here
        });
    }
}

/* Creates DOM objects for a year that will contain the projects for that year
 * @param year The year container that needs to be created
 * @param options Contains the options for creating the container DOM element
 */
function renderYearContainer(year, options) {
    // Default options
    options          = options              || {};
    var id           = options.id           || 'unidentified';
    var reverseOrder = options.reverseOrder || false;
    var headLink     = options.headerLink   || '#root';

    // Render container HTML
    var outHtml = '<div id="' + id + '" class=timeline-year><a ';
    if (headLink !== undefined || headLink !== '' || headLink !== null) {
        outHtml += 'href=' + headLink;
    }
    outHtml += '><h2>' + year + '</h2></a></div><section id="';
    outHtml += id + '-c" class="timeline timeline-container"></section>';

    // Add to page
    if (reverseOrder) {
        $container.prepend(outHtml);
    } else {
        $container.append(outHtml);
    }
}

/* Gets a set of all years of projects for each project in the project list
 * @param pjs The list of projects given
 * @return An array with all years as string
 */
function listProjectYears(pjs) {
    years = [];
    for (var i = 0, n = pjs.length; i < n; i++) {
        var year = getEndYear(pjs[i]);
        if (years.includes(year)) {
            continue;
        } else {
            years.push(year);
        }
    }
    console.log(years);
    return years;
}

/* Renders the HTML for a single project
 * @param project The project object that is to be rendered
 * @param options The options for rendering the HTML of the project
 */
function renderProject(project, options) {
    // Default options values
    options = options || {};

    // Read information from project entry
    var icon, iconColor;
    switch (project.type) {
        case 'code':
            icon = templateIcon.code;
            iconColor = templateColor.sky;
            break;
        case 'mech':
            icon = templateIcon.tools;
            iconColor = templateColor.yellow;
            break;
        case 'elec':
            icon = templateIcon.chip;
            iconColor = templateColor.blue;
            break;
        case 'design':
            icon = templateIcon.cube;
            iconColor = templateColor.green;
            break;
        default:
            icon = '';
            iconColor = templateColor.red;
            console.error('Project type error', project);
            break;
    }

    var projectDate = project.dates.end;
    var projectYear = getEndYear(project);
    var projectImg = project.thumbnail;

    // Write HTML
    var outHtml = '<div class="timeline-block">';
    outHtml += '<div class="timeline-icon timeline-icon-' + iconColor + '">';
    outHtml += '<img src="img/icons/' + icon + '"></div>';
    outHtml += '<div class="timeline-body">';
    outHtml += '<h2>' + project.name + '</h2>';
    outHtml += '<p class="timeline-date">' + projectDate + '</p>';

    if (projectImg !== null && projectImg !== undefined && projectImg !== '') {
        outHtml += '<img src="' + projectImg + '">';
    }

    outHtml += '<p class="text-muted">';
    outHtml += project.description;
    outHtml += '</p>';

    Object.keys(project.links).forEach(function(key, index) {
        outHtml += '<a class="btn btn-sm btn-outline-secondary" href="' + project.links[key] + '">';
        outHtml += capitalizeString(key) + '</a>';
    });

    outHtml += '</div></div>';

    // Add HTML to existing DOM
    var target = '#' + genId('year', projectYear) + '-c';
    $(target).append(outHtml);
}

/* Given a project, returns the year of the project in string form
 * @param project The project object
 * @return The year the project ended as a string
 */
function getEndYear(project) {
    if (project.dates.end !== undefined) {
        var d = new Date(project.dates.end);
        return String(d.getFullYear());
    } else {
        console.error('No date: ', project);
        return undefined;
    }
}

/* Capitalizes the first character in a string
 * @param str The string to capitalize
 * @return The string with the first letter in upper case
 */
function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/* Returns a generated ID
 * @param prefix The prefix of the ID
 * @param name Name of the ID
 * @return The ID as string
 */
function genId(prefix, name) {
    return prefix + name;
}