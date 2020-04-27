const TranssactionBuilder = require('./TranssactionBuilder');
const Constants = require('../../helpers/Constants').constants;

class TranssactionFactory{
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

module.exports = TranssactionFactory;