function addFooter(parent) {
    parent = parent || '#main';
    const date = new Date();
    const footer = '<footer><small><p class="mb-0">Copyright © 2014-' + date.getFullYear() + ' Muchen He</p> \
        This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>. \
        </small> \
    </footer>';

    $(parent).append(footer);
}

function addNavbar(current) {
    const navs = ['About', 'Blog', 'Documents', 'Gallery', 'Projects', 'Resume', 'Sketches', 'Toolbox'];
    const links = ['/', '/blog', '/documents', '/gallery', '/projects', '/resume', '/sketches', '/tools'];

    const navbarBegin = `
<nav class="navbar sticky-top navbar-expand-md navbar-light bg-light">
    <div class="container-fluid">
        <a href="/" class="navbar-brand">MUCHEN HE</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
    `;

    const navbarOldStuff = `
    </ul>
    <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" href="/archive">Old stuff</a></li>
    </ul>
    `;

    const navbarEnd = `
        </div>
    </div>
</nav>
    `;

    var outHtml = navbarBegin;
    for (var i = 0, l = navs.length; i < l; i++) {
        outHtml += '<li class="nav-item';
        if (current === navs[i]) outHtml += ' active';
        outHtml += '"><a class="nav-link" href="';
        outHtml += links[i];
        outHtml += '">';
        outHtml += navs[i];
        if (current === navs[i]) outHtml += '<span class="sr-only">(current)</span>';
        outHtml += '</a></li>';
    }
    outHtml += navbarEnd;
    $('body').prepend(outHtml);
}