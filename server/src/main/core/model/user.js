class User {
    constructor() {
        this.name = null;
        this.email = null;
        this.passwoed = null;

        this.accounts = new Array();
        this.tags = new Array();
    }

    get allBalance(){
        balance = 0;
        accounts.forEach(ac => {
            balance+= ac.getAllBalance();
        });
        return balance;
    }

    get netBalance(){
        balance = 0;
        accounts.forEach(ac => {
            balance+= ac.getNetBalance();
        });
        return balance;
    }

  }

module.exports = User;