const Deposit = require('../model/Deposit');
const Outlay = require('../model/Outlay');
const Constants = require('../../helpers/Constants').constants;

class TranssactionBuilder{
    constructor(type){
        if (type == Constants.OUTLAY_STRING){
            this.currentTranssaction = new Deposit();
        }else{
            this.currentTranssaction = new Outlay();
        }
    }

    setName(name){
        this.currentTranssaction.name = name;
        return this;
    }

    setTag(tag){
        this.currentTranssaction.tag = tag;
        return this;
    }

    setAmount(amount){
        this.currentTranssaction.amount = amount;
        return this;
    }

    setPaid(paid){
        this.currentTranssaction.paid = paid;
        return this;
    }

    setEndDate(endDate){
        this.currentTranssaction.endDate = endDate;
        return this;
    }

    setPeriodic(periodic){
        this.currentTranssaction.periodic = periodic;
        return this;
    }

    build(){
        return this.currentTranssaction;
    }
}

module.exports = TranssactionBuilder;