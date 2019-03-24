function addFooter(parent) {
    parent = parent || 'main';
    const date = new Date();
    var footerNode = document.createElement('footer');
    footerNode.innerHTML = '<small><p class="mb-0">Copyright © 2014-' + date.getFullYear() + ' Muchen He</p> \
        This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>. \
        </small>';
    document.getElementById(parent).appendChild(footerNode);
}

function addNavbar(current) {
    const navs = ['About', 'Blog', 'Documents', 'Gallery', 'Projects', 'Resume', 'Sketches', 'Toolbox'];
    const links = ['/', '/blog', '/documents', '/gallery', '/projects', '/resume', '/sketches', '/tools'];

    const navbarBegin = `
    <div class="container-fluid">
        <a href="/" class="navbar-brand">Muchen He</a>
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

    const navbarEnd = "</ul></div></div>";

    var navNode = document.createElement("nav");
    navNode.className += "navbar sticky-top navbar-expand-md navbar-light bg-light"

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

    navNode.innerHTML = outHtml;

    var bodyNode = document.getElementsByTagName('body')[0]
    bodyNode.insertBefore(navNode, bodyNode.firstChild);
}