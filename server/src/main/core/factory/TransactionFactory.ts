import TransactionBuilder from './TransactionBuilder';
import * as Constants from '../../helpers/Constants';

export default class TransactionFactory{
    private static instance?: TransactionFactory
    constructor(){
        
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new TransactionFactory();
        } 
        return this.instance;
    }

    createOutlayBuilder(name: string, amount:number){
        return new TransactionBuilder(Constants.OUTLAY_STRING, name, amount);
    }

    createDepositBuilder(name: string, amount:number){
        return new TransactionBuilder(Constants.DEPOSIT_STRING, name, amount);
    }
}