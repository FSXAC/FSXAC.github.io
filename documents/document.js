// HTML templates
var DT = {
    category: '<section><h2>{{category}}</h2><div class="card-grid"><div class= "card-gutter-sizer" ></div>{{courses}}</div></section>',
    course: '<div id="{{cid}}" class="card p-2">{{content}}</div>',
    courseHeader: '<div class="card-header p-0"><small>{{id}}</small><h3>{{name}}</h3><small>{{date}}</small></div>',
    courseBody: '<div class="card-body"><ul class="list-group list-group-flush">{{entries}}</ul></div>',
    entry: '<li class="list-group-item"><a href="{{link}}">{{title}}</a>{{badge}}</li>',
    badgeDraft: '<span class="badge badge-secondary">draft</span>',
    badgeNew: '<span class="badge badge-success">new</span>',
    NA: 'Not available',
};


// This function reads the document json file
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'documents.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == '200') {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

// Takes in document JSON entries and returns html as string
function parseDocumentsToHtml(documents) {
    // Parse JSON to object
    var docs = JSON.parse(documents).docs;

    // Output HTML
    var outHtml = '';

    // Iterate through categories
    for (var categoryIndex in docs) {
        var category = docs[categoryIndex];

        // Create HTML for each category
        var categoryName = category.category;
        var categoryHtml = DT.category.replace('{{category}}', categoryName);
        var coursesHtml = '';

        // Iterate through each course in the category
        for (var i = 0, numCourses = category.courses.length; i < numCourses; i++) {
            var course = category.courses[i];

            // Create HTML for each course
            var courseHtml = DT.course;
            var courseHeaderHtml = DT.courseHeader;

            // Fill in the course header
            // Contains {{name}}, {{id}}, {{date}}
            courseHeaderHtml = courseHeaderHtml
                .replace('{{name}}', course.description)
                .replace('{{id}}', course.course)
                .replace('{{date}}', (course.date === '') ? DT.NA : 'Last edited ' + course.date);

            // If the course has no entries, finish and move on
            if (course.entries.length === 0) {
                courseHtml = courseHtml
                    .replace('{{content}}', courseHeaderHtml)
                    .replace('{{cid}}', course.course.replace(' ', '-'));
                coursesHtml += courseHtml;
                continue;
            }

            // Otherwise, have body
            var courseBodyHtml = DT.courseBody;
            var entriesHtml = '';

            // Iterate through all notes / document entries
            for (var j = 0, numEntries = course.entries.length; j < numEntries; j++) {
                var entry = course.entries[j];

                // Create HTML for this entry
                // Things to replace are: {{link}}, {{title}}, {{badge}}

                if (entry.enum === undefined) {
                    var entryHtml = DT.entry
                        .replace('{{link}}', entry.link)
                        .replace('{{title}}', entry.title);

                    // Add badges depending on the flags
                    if (entry.flag === 'draft') {
                        entryHtml = entryHtml.replace('{{badge}}', DT.badgeDraft);
                    } else if (entry.flag === 'new') {
                        entryHtml = entryHtml.replace('{{badge}}', DT.badgeNew);
                    } else {
                        entryHtml = entryHtml.replace('{{badge}}', '');
                    }

                    // Add entry html
                    entriesHtml += entryHtml;
                } else if (entry.enum !== undefined && entry.links !== undefined) {
                    var entryHtml = '<li class="list-group-item  bg-light">' + entry.title + ' ';
                    var subEntryHtml = '<a class="btn btn-xs btn-outline-primary" href="{{link}}" style="margin-left:2px; margin-right: 2px">{{title}}</a>';

                    var n_enums = entry.enum.length;
                    var n_links = entry.links.length;
                    
                    if (n_enums === n_links) {
                        for (var x = 0; x < n_enums; x++) {
                            entryHtml += subEntryHtml.replace('{{link}}', entry.links[x]).replace('{{title}}', entry.enum[x].toString());
                            // entryHtml += + (x == n_enums - 1) ? '' : ', ';
                        }
                    } else {
                        // Ill-defined project entry
                        console.error('Ill-defined project entry');
                    }

                    entryHtml += '</li>';
                    entriesHtml += entryHtml;
                }
            }
            
            // Pack course together
            courseBodyHtml = courseBodyHtml.replace('{{entries}}', entriesHtml);
            courseHtml = courseHtml
                .replace('{{content}}', courseHeaderHtml + courseBodyHtml)
                .replace('{{cid}}', course.course.replace(' ', '-'));

            // Add courses to courses HTML
            coursesHtml += courseHtml;
        }

        // Pack category
        categoryHtml = categoryHtml.replace('{{courses}}', coursesHtml);
        outHtml += categoryHtml;
    }
    
    return outHtml;
}