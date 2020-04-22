const User = require('../model/User');

class UserFactory{
    constructor(){
        
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new UserFactory();
        } 
        return this.instance;
    }

    createUser(){
        return new User();
    }
}

module.exports = UserFactory;