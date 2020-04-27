class Account{

    constructor(){
        this.name = null;
        this.transsactions = new Array();
    }

    addTranssaction(transsactions){
        this.transsactions.push(transsactions);
    }

    getBalance(){
        balance = 0;
        this.transsactions.forEach(tr => {
            balance+= tr.getAllBalance();
        });
        return balance;
    }

    getNetBalance(){
        balance = 0;
        this.transsactions.forEach(tr => {
            balance+= tr.getNetBalance();
        });
        return balance;
    }
}

module.exports = Account;