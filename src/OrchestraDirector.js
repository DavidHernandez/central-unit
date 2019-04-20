import Bus from './infrastructure/Bus.js'

export default class OrchestraDirector {
    constructor() {
        this.bus = new Bus()
    }

    conduct(phrase) {
        const topic = phrase.service + '.' + phrase.action

        this.bus.publish(topic, phrase.parameters)
    }
}
