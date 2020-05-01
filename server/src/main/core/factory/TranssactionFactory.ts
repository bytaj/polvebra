import TranssactionBuilder from './TranssactionBuilder';
import * as Constants from '../../helpers/Constants';

export default class TranssactionFactory{
    private static instance?: TranssactionFactory
    constructor(){
        
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new TranssactionFactory();
        } 
        return this.instance;
    }

    createOutlayBuilder(){
        return new TranssactionBuilder(Constants.OUTLAY_STRING);
    }

    createDepositBuilder(){
        return new TranssactionBuilder(Constants.DEPOSIT_STRING);
    }
}