import Itranssaction from './Itranssaction';

export default class Outlay extends Itranssaction{
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