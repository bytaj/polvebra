const Itranssaction = require('./Itranssaction');

class Outlay extends Itranssaction{
    getTotalAmount(){ 
        return -(super.getTotalAmount());
    }

    getNetAmount(){
        return -(super.getNetAmount());
    }

    getRetainAmount(){
        return -(super.getRetainAmount());
    }
}

module.exports = Outlay;