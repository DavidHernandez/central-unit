export default class Bus {
    constructor() {
        const bus = this.constructor.bus

        if (bus) {
            return bus
        }

        this.actions = []
        this.constructor.bus = this
    }

    publish(topic, message) {
        if(!this.topicExists(topic)) {
            throw new Error('Topic does not exist')
        }

        this.actions[topic].forEach((action) => {
            action(message)
        })
    }

    subscribe(topic, callback) {
        if (!this.topicExists(topic)) {
            this.actions[topic] = []
        }

        this.actions[topic].push(callback)
    }

    topicExists(topic) {
        return !!this.actions[topic]
    }
}
