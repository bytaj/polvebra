const User = require('../model/User');

class UserBuilder{
    constructor(){
        this.currentUser = new User();
    }

    setName(name){
        this.currentUser.name = name;
        return this;
    }

    setEmail(email){
        this.currentUser.email = email;
        return this;
    }

    setPassword(password){
        this.currentUser.password = password;
        return this;
    }

    setAccounts(accounts){
        this.currentUser.accounts = accounts;
        return this;
    }

    setTags(tags){
        this.currentUser.tags = tags;
        return this;
    }

    build(){
        return this.currentUser;
    }
}

module.exports = UserBuilder;