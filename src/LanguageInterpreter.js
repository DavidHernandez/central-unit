export default class LanguageInterpreter {
    constructor(phrase) {
        if (typeof phrase !== 'string') {
            throw new Error('Invalid phrase')
        }

        const phraseComponents = phrase.toLowerCase().split(" ")
        if (phraseComponents.length < 2) {
            throw new Error('Invalid phrase')
        }

        this.phrase = phraseComponents
    }

    extractAction() {
        return this.phrase[0]
    }

    extractService() {
        return this.phrase[1]
    }

    extractParameters() {
        const phrase = this.phrase.map((parameter) => {
            return parameter.split(",")[0]

        })

        phrase.shift()
        phrase.shift()

        return phrase
    }
}
