const fs = require("fs");

class Config {

    constructor(id) {
        this.path = "./assets/" + id + ".json"
        this.json = null;
    }

    exists() {
        return fs.existsSync(this.path);    
    }
    
    get() {
        return this.get(false);
    }

    get(read) {
        if (this.json == null || read) {
            this.json = JSON.parse(fs.readFileSync(this.path));
        }

        return this.json;
    }

    save() {
        fs.writeFileSync(this.path, JSON.stringify(this.json, null, 2));
    }
}

module.exports = { Config };