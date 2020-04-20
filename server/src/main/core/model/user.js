class User {
    constructor() {
        this.accounts = new Array();
        this.tags = new Array();
    }

    get name (){
        return this.name;
    }

    set name(name){
        this.name = name;
    }

    get email (){
        return this.email;
    }

    set email(email){
        this.email = email;
    }

    get password (){
        return this.password;
    }

    set password(password){
        this.password = password;
    }
    
    get accounts (){
        return this.accounts;
    }

    set accounts(accounts){
        this.accounts = accounts;
    }

    get tags (){
        return this.tags;
    }

    set tags(tags){
        this.tags = tags;
    }







    

    getAllBalance(){
        balance = 0;
        accounts.forEach(ac => {
            balance+= ac.getAllBalance();
        });
        return balance;
    }

    getNetBalance(){
        balance = 0;
        accounts.forEach(ac => {
            balance+= ac.getNetBalance();
        });
        return balance;
    }

  }