const { XMLHttpRequest } = require("xhr2");

function asyncUserByName(name, callback) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            var json = JSON.parse(http.responseText);

            if (args.json.results.length == 0) {
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

            callback(user);
        }
    }
    http.open("GET", `https://laby.net/api/search/names/${name}`, true);
    http.setRequestHeader("User-Agent", "Mozilla/5.0 (compatible; name-checker-bot/1.0; +https://discord.com/users/288772430221148162)");
    http.send(null);
}

function asyncSearch(name, callback) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            var json = JSON.parse(http.responseText);
            callback(json);
        }
    }
    http.open("GET", `https://laby.net/api/search/names/${name}`, true);
    http.setRequestHeader("User-Agent", "Mozilla/5.0 (compatible; name-checker-bot/1.0; +https://discord.com/users/288772430221148162)");
    http.send(null);
}

function asyncNameHistory(uuid, callback) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            var json = JSON.parse(http.responseText);
            callback(json);
        }
    }
    http.open("GET", `https://laby.net/api/user/${uuid}/get-snippet`, true);
    http.setRequestHeader("User-Agent", "Mozilla/5.0 (compatible; name-checker-bot/1.0; +https://discord.com/users/288772430221148162)");
    http.send(null);
}

function asyncCheckStatus(name, callback) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            var json = JSON.parse(http.responseText);
            callback(json);
        }
    }
    http.open("GET", `https://laby.net/api/search/get-previous-accounts/${name}`, true);
    http.setRequestHeader("User-Agent", "Mozilla/5.0 (compatible; name-checker-bot/1.0; +https://discord.com/users/288772430221148162)");
    http.send(null);
}

function asyncBadges(uuid, callback) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            var json = JSON.parse(http.responseText);
            callback(json);
        }
    }
    http.open("GET", `https://laby.net/api/user/${uuid}/get-badges`, true);
    http.setRequestHeader("User-Agent", "Mozilla/5.0 (compatible; name-checker-bot/1.0; +https://discord.com/users/288772430221148162)");
    http.send(null);
}

module.exports = { asyncUserByName, asyncSearch, asyncNameHistory, asyncCheckStatus, asyncBadges };