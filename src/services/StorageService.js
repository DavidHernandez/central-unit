export default class StorageService {
    constructor() {}

    async create(entityName, entityObject) {
        entityObject.id = Math.random(0, 10)
    }
}
