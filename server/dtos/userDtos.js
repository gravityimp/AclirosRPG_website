module.exports = class UserDto {
    name;
    id;
    uuid;
    constructor(model){
        this.name = model.name;
        this.id = model.id;
        this.uuid = model.uuid;
    }
}