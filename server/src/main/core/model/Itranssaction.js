const Constans = require('../../helpers/Constants').constans;

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
        this.getAmout(ALL_AMOUNT);
    }

    getNetAmount(){
        this.getAmout(NET_AMOUNT);
    }

    getRetainAmount(){
        this.getAmout(RETAIN_AMOUNT);
    }

    getAmout(type){
        if (this.subtranssaction.length>0){
            let subtranssactionAmount = 0;
            this.subtranssaction.forEach(tr => {
                switch(type){
                    case Constans.ALL_AMOUNT:
                        subtranssactionAmount += Math.abs(tr.getAmout());
                        break;
                    case Constans.NET_AMOUNT:
                        if (tr.paid){
                            subtranssactionAmount += Math.abs(tr.getAmout());
                            break;
                        }
                    case Constans.RETAIN_AMOUNT:
                        if (!tr.paid){
                            subtranssactionAmount += Math.abs(tr.getAmout());
                            break;
                        }
                }
            })
        }
        Math.abs(this.amount > subtranssactionAmount) ? this.amount : subtranssactionAmount;
    }

    addSubTranssaction(subtranssaction){
        this.subtranssaction.add(subtranssaction);
    }
}

module.exports = ITranssaction;