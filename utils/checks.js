const { asyncUserByName, asyncNameSearch, asyncNameHistory ,asyncNameStatus, asyncBadges } = require("./connection");

function checkNameSearch(name, callback) {
    asyncNameSearch(name, function(json) {
        if (json.results.length == 0) {
            callback(name, null);
            return;
        }

        callback(name, json.results);
        return;
    });
}

function checkNameHistory(name, callback) {
    asyncUserByName(name, function(user) {
        if (user == null) {
            callback(name, null, null);
            return;
        }

        asyncNameHistory(user.uuid, function(json) {
            callback(user.user_name, user.uuid, json.name_history);
            return;
        });
    });
}

function checkNameStatus(name, callback) {
    asyncNameStatus(name, function(json) {
        var date = null;

        if (json.users.length == 0) {
            callback(name, null, null);
            return;
        }

        var users = json.users;

        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            var history = user.history;

            if (user.userName.toLowerCase() == name.toLowerCase()) {
                callback(user.userName, user.uuid, null);
                return;
            }
            
            for (var j = 0; j < history.length; j++) {
                if (history[j].userName.toLowerCase() != name.toLowerCase()) {
                    continue;
                }

                var updatedAt = new Date(history[j - 1].updatedAt.split("+")[0] + "+00:00");

                if (date != null && date.getTime() >= updatedAt.getTime()) {
                    continue;
                }

                date = updatedAt;
            }
        }

        if (date.getTime() + (37 * 24 * 60 * 60 * 1000) < new Date().getTime()) {
            callback(name, null, null);
            return;
        }

        callback(name, null, date.getTime() / 1000 + (37 * 24 * 60 * 60));
        return;
    });
}

function checkBadget(name, callback) {
    asyncUserByName(name, function(user) {
        if (user == null) {
            callback(name, null, null);
            return;
        }

        asyncBadges(user.uuid, function(json) {
            callback(user.user_name, user.uuid, json);
            return;
        });
    });
}

module.exports = { checkNameSearch, checkNameHistory , checkNameStatus, checkBadget }