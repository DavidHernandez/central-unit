import Bus from '../src/infrastructure/Bus.js'
import OrchestraDirector from '../src/OrchestraDirector.js'

describe('The orchestra director', () => {
    it('understands a phrase and conducts it to the right actor', () => {
        const director = new OrchestraDirector()

        const bus = new Bus()
        let message = false
        const callback = (payload) => {message = true}
        bus.subscribe('service.action', callback)

        const phrase = {
            service: "service",
            action: "action",
            parameters: []
        }

        director.conduct(phrase)

        expect(message).toBe(true)
    })
})
