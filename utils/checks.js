const { asyncNameSearch, asyncNameHistory ,asyncNameStatus } = require("./connection");

function checkNameSearch(name, callback) {
    asyncNameSearch(name, function(args) {
        if (args.json.results.length == 0) {
            callback(name, null);
            return;
        }

        callback(name, args.json.results);
        return;
    });
}

function checkNameHistory(name, callback) {
    asyncNameHistory(name, function(args) {
        if (args == null) {
            callback(name, null, null);
            return;
        }

        callback(args.json.user.user_name, args.json.user.uuid, args.json.name_history);
        return;
    });
}

function checkNameStatus(name, callback) {
    asyncNameStatus(name, function(args) {
        var date = null;

        if (args.json.users.length == 0) {
            callback(name, null, null);
            return;
        }

        var users = args.json.users;

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

module.exports = { checkNameSearch, checkNameHistory , checkNameStatus }