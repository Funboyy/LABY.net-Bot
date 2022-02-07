const { XMLHttpRequest } = require("xhr2");

function asyncNameSearch(name, callback) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            var json = JSON.parse(http.responseText);
            callback({ name, json });
        }
    }
    http.open("GET", `https://laby.net/api/search/names/${name}`, true);
    http.setRequestHeader("User-Agent", "Mozilla/5.0 (compatible; name-checker-bot/1.0; +https://discord.com/users/288772430221148162)");
    http.send(null);
}

function asyncNameHistory(name, callback) {
    asyncNameSearch(name, function(args) {
        if (args.json.results.length == 0) {

            console.log(args.json.results);

            callback(null);
            return;
        }

        var json = args.json;
        var user = null;
        
        for (var i = 0; i < json.results.length; i++) {
            if (json.results[i].user_name.toLowerCase() != name.toLowerCase()) {
                continue;
            } 

            user = json.results[i];
        }

        if (user == null) {
            callback(null);
            return;
        }

        var http = new XMLHttpRequest();
        http.onreadystatechange = function() {
            if (http.readyState == 4) {
                var json = JSON.parse(http.responseText);
                callback({ name, json });
            }
        }
        http.open("GET", `https://laby.net/api/user/${user.uuid}/get-snippet`, true);
        http.setRequestHeader("User-Agent", "Mozilla/5.0 (compatible; name-checker-bot/1.0; +https://discord.com/users/288772430221148162)");
        http.send(null);
    });
}

function asyncNameStatus(name, callback) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            var json = JSON.parse(http.responseText);
            callback({ name, json });
        }
    }
    http.open("GET", `https://laby.net/api/search/get-previous-accounts/${name}`, true);
    http.setRequestHeader("User-Agent", "Mozilla/5.0 (compatible; name-checker-bot/1.0; +https://discord.com/users/288772430221148162)");
    http.send(null);
}

module.exports = { asyncNameSearch, asyncNameHistory, asyncNameStatus };