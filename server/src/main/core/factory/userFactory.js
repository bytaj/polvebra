const UserBuilder = require('./UserBuilder');

class UserFactory{
    constructor(){
        
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new UserFactory();
        } 
        return this.instance;
    }

    createUserBuilder(){
        return new UserBuilder();
    }
}

module.exports = UserFactory;