import LanguageInterpreter from '../src/LanguageInterpreter.js'

describe('A language interpreter', () => {
    it('can find the action', () => {
        const phrase = "create contact david"
        const interpreter = new LanguageInterpreter(phrase)
        const action = "create"

        const extractedAction = interpreter.extractAction()

        expect(extractedAction).toEqual(action)
    })

    it('understands phrases with different casing', () => {
        const phrase = "CREATE CONTACT DAVID"
        const interpreter = new LanguageInterpreter(phrase)

        const action = "create"

        const extractedAction = interpreter.extractAction()

        expect(extractedAction).toEqual(action)
    })

    it('can find the service', () => {
        const phrase = "create contact david"
        const interpreter = new LanguageInterpreter(phrase)
        const service = "contact"

        const extractedService = interpreter.extractService()

        expect(extractedService).toEqual(service)
    })

    it('validates that the phrase has all the needed components', () => {
        const phrase = "create"

        expect(() => {
            new LanguageInterpreter(phrase)
        }).toThrow('Invalid phrase')

        expect(() => {
            new LanguageInterpreter()
        }).toThrow('Invalid phrase')

        const validPhrase = "create contact"

        expect(() => {
            new LanguageInterpreter(validPhrase)
        }).not.toThrowError()
    })

    it('extracts the parameters', () => {
        const phrase = "create contact david, 123456789, hola@davidhernandez.info"
        const interpreter = new LanguageInterpreter(phrase)
        const parameters = ['david', '123456789', 'hola@davidhernandez.info']

        const extractedParameters = interpreter.extractParameters()

        expect(extractedParameters).toEqual(parameters)
    })
})
