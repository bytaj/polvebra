const Itranssaction = require('./Itranssaction');

class Outlay extends Itranssaction{
    getAmout(){
        return -(super.getAmout());
    }
}

module.exports = Outlay;