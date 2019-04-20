import Bus from '../src/infrastructure/Bus.js'

describe("A bus", () => {
    it('fails to publish a topic, if there are not interested agents', () => {
        const bus = new Bus()

        expect(() => {
            bus.publish('topic')
        }).toThrow('Topic does not exist')

    })

    it('adds a topic when an agent subscribes', () => {
        const bus = new Bus()
        const callback = () => {}

        bus.subscribe('topic', callback)

        expect(bus.topicExists('topic')).toBe(true)
    })

    it('notifies the subscribers when a topic is published', () => {
        const bus = new Bus()
        let message = false

        const callback = (payload) => {message = true}

        bus.subscribe('topic', callback)
        bus.publish('topic', message)

        expect(message).toBe(true)
    })
})
