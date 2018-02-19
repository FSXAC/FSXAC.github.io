// HTML templates
var DT = {
    category: '<section><h2 class="fancy">{{category}}</h2><div class="card-columns">{{courses}}</div></section>',
    course: '<div class="card bg-light">{{content}}</div>',
    courseHeader: '<div class="card-header p-2"><h3 class="hype">{{name}}</h3><em class="text-muted">{{date}}</em>',
    courseBody: '<div class="card-body p-2"><ul class="list-group list-group-flush">{{entries}}</ul></div>',
    entry: '<li class="list-group-item p-0 bg-light {{extra}}"><a href="{{link}}">{{title}}</a>{{badge}}</li>',
    badgeDraft: '<span class="badge badge-secondary badge-pill">draft</span>',
    badgeNew: '<span class="badge badge-success badge-pill">new</span>',

    extraClass: 'd-flex justify-content-between align-items-center',
    comingSoon: 'Coming soon...',
}


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
        var category = docs[category]

        // Create HTML for each category
        var categoryName = category.category;
        var categoryHtml = DT.category.replace('{{category}}', categoryName);

        // Iterate through each course in the category
        
    }
    
    // TODO:
    return docs;
}