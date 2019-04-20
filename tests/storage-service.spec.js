import StorageService from '../src/services/StorageService.js'

describe('A Storage Service', () => {
    it('can create items', () => {
        const storage = new StorageService()

        const item = {
            name: "David"
        }

        storage.create('item', item)

        expect(item).toHaveProperty('id')
    })
})
