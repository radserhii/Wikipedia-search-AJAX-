function getSearchWiki (params, method, url, numberResults) {
    var body = Object.keys(params)
        .map(function(prop) {
            return prop + '=' + params[prop];
        })
        .join('&');

    var http = new XMLHttpRequest();
    http.open(method, url);

    function handleResponse() {
        if (this.readyState == 4) {
            if (this.status == 200) {

               var response = JSON.parse(this.responseText);
               var ul = document.querySelector('ul');

               // remove all previous search results
               while(ul.firstChild) {
                   ul.removeChild(ul.firstChild);
               }

                for (var i = 0; i < numberResults; i++) {
                    if (response[1][i]) {
                       var li = document.createElement('li');
                       var a = document.createElement('a');

                       li.className = "list-group-item";
                       a.innerHTML = response[1][i];
                       a.href = response[3][i];
                       a.target = "_blank";

                       ul.appendChild(li).appendChild(a);
                   }
               }
            }
        }
    }

    http.addEventListener('readystatechange', handleResponse);

    http.send(body);
}



