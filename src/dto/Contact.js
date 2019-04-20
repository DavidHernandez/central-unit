import StorageService from '../services/StorageService.js'

export default class Contact {
    constructor(name, phone, mail) {
        this.name = name
        this.phone = phone
        this.mail = mail
        this.id = undefined
    }

    async save() {
        const storage = new StorageService()

        await storage.create('contact', this)
    }
}
