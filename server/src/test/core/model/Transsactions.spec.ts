import assert from 'assert';
import AbstractFactory from '../../../main/core/factory/AbstractFactory';
//import Itranssaction from '../../../main/core/model/ITranssaction';
//import TranssactionFactory from '../../../main/core/factory/TranssactionFactory';
//import TranssactionBuilder from '../../../main/core/factory/TranssactionBuilder';
import Tag from '../../../main/core/model/Tag';

describe('Transsactions', function() {
    const defaultAmount = 100;
    let transsactionBuilder = AbstractFactory.getTranssactionFactory();
    let outlay = transsactionBuilder.createOutlayBuilder().setName('MainOutlay').setAmount(defaultAmount).setTag(new Tag('General')).setPeriodic(false).setPaid(true).build();
    let deposit = transsactionBuilder.createDepositBuilder().setName('MainDeposit').setAmount(defaultAmount).setTag(new Tag('General')).setPeriodic(false).setPaid(true).build();
    
    it('Outlay has negative amount', function() {
        assert(outlay.getTotalAmount() < 0);
    })

    it('Deposit has positive amount', function() {
        assert(deposit.getTotalAmount() > 0);
    })

    it('Transsactions has subtranssactions', function() {
        outlay.addSubTranssaction(transsactionBuilder.createOutlayBuilder().setName('SubOutlay1').setAmount(50).setTag(new Tag('Videogames')).setPeriodic(false).setPaid(true).build());
        assert.equal(outlay.getSubtranssaction().length, 1);
        assert.equal(outlay.getTotalAmount(), -100);
    })
});