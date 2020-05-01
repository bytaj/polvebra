import Account from '../model/Account';
import * as Constants from '../../helpers/Constants';

export default class AccountFactory{
    private static instance?: AccountFactory
    constructor(){
        
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new AccountFactory();
        } 
        return this.instance;
    }

    createAccount(name?: string){
        let account 
        if(name){
            account= new Account(name);
        }else{
            account= new Account(Constants.DEFAULT_ACCOUNT_NAME);
        }
        return account;
    }
}