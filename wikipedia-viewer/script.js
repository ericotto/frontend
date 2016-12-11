$('#search').submit( function(event){
  event.preventDefault();
  $('#results').empty()
  var query = event.target.query.value;
  console.log(query);
  searchWikipedia(query);
});

$('#random').click( function() {
    window.location.replace("https://en.wikipedia.org/wiki/Special:Random");
})

function searchWikipedia(query) {
    var baseUrl = 'http://en.wikipedia.org/w/api.php';
    var params = '?action=opensearch&limit=10&fomat=json&search=' + query;
    var url = baseUrl + params + '&callback=?';
    console.log(url);
    $.getJSON(url, function(data) {
        var searchResults = "";
        for (var i  = 0; i < data[1].length; i++) {
            var title = data[1][i];
            var snippet = data[2][i];
            var link = data[3][i];
            console.log(title, snippet, link);
            searchResults += searchResultHTML(title, snippet, link);
        }
        $("#results").append(searchResults);
    })
}

function searchResultHTML(title, snippet, link) {
    var html = "";
    html += "<div>";
    html +=   "<div class='result-card mdl-card mdl-shadow--2dp'>";
    html +=     "<div class='mdl-card__title'>"
    html +=       "<h3 class='mdl-card__title-text'>" + title + "</h3>";
    html +=     "</div>"
    html +=     "<div class='mdl-card__supporting-text'>" + snippet + "</div>";
    html +=     "<div class='mdl-card__actions'>";
    html +=       "<a class='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect' href=" + link + ">Go to Article</a>";
    html +=     "</div>";
    html +=   "</div>";
    html += "</div>";
    return html;
}