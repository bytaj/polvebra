const Account = require('../model/Account');

class AccountFactory{
    constructor(){
        
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new AccountFactory();
        } 
        return this.instance;
    }

    createAccount(name){
        let account = new Account();
        account.name = name;
        return account;
    }
}

module.exports = AccountFactory;