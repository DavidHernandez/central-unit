const Bus = require('./infrastructure/Bus.js');

class OrchestraDirector {
    constructor() {
        this.bus = new Bus()
    }

    conduct(phrase) {
        const topic = phrase.provider + '.' + phrase.action

        this.bus.publish(topic, phrase.parameters)
    }
}

module.exports = OrchestraDirector;
