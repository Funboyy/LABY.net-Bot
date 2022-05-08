const { XMLHttpRequest } = require("xhr2");

const userAgent = "Mozilla/5.0 (compatible; LABY.net-Bot/1.0; +https://github.com/Funboyy/LABY.net-Bot)";

function asyncUserByName(name, callback) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            var json = JSON.parse(http.responseText);

            if (json.results.length == 0) {
                callback(null);
                return;
            }
    
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
    http.setRequestHeader("User-Agent", userAgent);
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
    http.setRequestHeader("User-Agent", userAgent);
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
    http.setRequestHeader("User-Agent", userAgent);
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
    http.setRequestHeader("User-Agent", userAgent);
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
    http.setRequestHeader("User-Agent", userAgent);
    http.send(null);
}

module.exports = { asyncUserByName, asyncSearch, asyncNameHistory, asyncCheckStatus, asyncBadges };