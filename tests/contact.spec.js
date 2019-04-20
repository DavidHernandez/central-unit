import Contact from '../src/dto/Contact.js'

describe('A contact', () => {
    it('can be created', () => {
        const contact = new Contact('David', '123456789', 'hola@davidhernandez.info')

        contact.save()

        expect(contact).toHaveProperty('id')
    })
})
