function addFooter() {
    var date = new Date()
    var footer = '<footer><small><p>Copyright © 2014-' + date.getFullYear() + ' Muchen He</p> \
        This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>. \
        </small> \
    </footer>';

    $('#main').append(footer);
}

function addNavbar(current) {
    navs = ['Index', 'Blog', 'Documents', 'Gallery', 'Projects', 'Resume', 'Tools'];
    links = ['/', 'https://www.muchen.ca/blog', '/documents', '/gallery', '/projects', '/resume', '/tools'];

    var navbarBegin = `
    <nav class="navbar navbar-default navbar-fixed-top navbar-inverse" >
    <div class="container">
    <div class="navbar-header">
    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-collapsable" aria-expanded="false">
    <span class="sr-only">Toggle Nav</span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="/">Muchen He</a>
    </div>
    <div class="collapse navbar-collapse" id="nav-collapsable">
    <ul class="nav navbar-nav">
    `;

    var navbarEnd = `
    </ul>
    <ul class="nav navbar-nav navbar-right">
    <li role="presentation"><a href="/archive">Old Stuff</a></li>
    </ul>
    </div>
    </div>
    </nav>
    `;

    var outHtml = navbarBegin;
    for (var i = 0, l = navs.length; i < l; i++) {
        outHtml += '<li role="presentation"';
        if (current == navs[i]) outHtml += ' class = "active"';
        outHtml += '><a ';
        if (current != navs[i]) outHtml += 'href="' + links[i] + '"';
        outHtml += '>' + navs[i];
        if (current == navs[i]) outHtml += '<span class="sr-only">(current)</span>';
        outHtml += '</a></li>'
    }
    outHtml += navbarEnd;

    $('body').prepend(outHtml);
}