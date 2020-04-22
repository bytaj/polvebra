const UserFactory = require('./UserFactory')

class AbstractFactory{
    constructor(){
        
    }

    static getUserFactory(){
        return UserFactory.getInstance();
    }
}

module.exports = AbstractFactory;