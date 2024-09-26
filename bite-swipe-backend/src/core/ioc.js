// ioc.js
class Container {
    constructor() {
        this.services = {};
    }
    
    register(name, instance) {
        this.services[name] = instance;
    }
    
    get(name) {
        return this.services[name];
    }
}

module.exports = new Container();