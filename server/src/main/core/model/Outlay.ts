import AbstractTransaction from './AbstractTransaction';

export default class Outlay extends AbstractTransaction{
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