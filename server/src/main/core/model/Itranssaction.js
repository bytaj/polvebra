const Constans = require('../../helpers/Constants').constants;

class ITranssaction{
    constructor(){
        this.name = null;
        this.tag = null;
        this.amount = null;
        this.subtranssaction = new Array();
        this.date = new Date();
        this.paid = true;
        this.endDate = null;
        this.periodic = false;
    }

    getTotalAmount(){
        return this.getAmout(Constans.ALL_AMOUNT);
    }

    getNetAmount(){
        return this.getAmout(Constans.NET_AMOUNT);
    }

    getRetainAmount(){
        return this.getAmout(Constans.RETAIN_AMOUNT);
    }

    getAmout(type){
        if (this.subtranssaction.length>0){
            let subtranssactionAmount = 0;
            this.subtranssaction.forEach(tr => {
                switch(type){
                    case Constans.ALL_AMOUNT:
                        subtranssactionAmount += Math.abs(tr.getAmount(type));
                        break;
                    case Constans.NET_AMOUNT:
                        if (tr.paid){
                            subtranssactionAmount += Math.abs(tr.getAmount(type));
                            break;
                        }
                    case Constans.RETAIN_AMOUNT:
                        if (!tr.paid){
                            subtranssactionAmount += Math.abs(tr.getAmount(type));
                            break;
                        }
                }
            })
            return this.amount > Math.abs(subtranssactionAmount) ? this.amount : subtranssactionAmount;
        }else{
            return this.amount;
        }
        
    }

    addSubTranssaction(subtranssaction){
        this.subtranssaction.add(subtranssaction);
    }
}

module.exports = ITranssaction;