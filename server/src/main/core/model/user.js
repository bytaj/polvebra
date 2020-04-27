const AbstractFactory = require('../factory/AbstractFactory');

class User {
    constructor() {
        this.name = null;
        this.email = null;
        this.password = null;

        this.accounts = new Array();
        this.tags = new Array();
    }

    getAllBalance(){
        balance = 0;
        this.accounts.forEach(ac => {
            balance+= ac.getAllBalance();
        });
        return balance;
    }

    getNetBalance(){
        balance = 0;
        this.accounts.forEach(ac => {
            balance+= ac.getNetBalance();
        });
        return balance;
    }

    createAccount(name){
        accounts.push(AbstractFactory.getAccountFactory().createAccount(name));
    }

    addTranssition(transsaction, account){
        if (this.accounts.includes(account)){
            account.addTranssition(transsaction);
        }
    }
    
  }

module.exports = User;