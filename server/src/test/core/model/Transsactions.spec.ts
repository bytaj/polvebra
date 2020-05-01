import assert from 'assert';
import AbstractFactory from '../../../main/core/factory/AbstractFactory';
import Outlay from '../../../main/core/model/Outlay';
import Tag from '../../../main/core/model/Tag';

describe('Transsactions', function() {
    const defaultAmount = 100;
    let transsactionBuilder = AbstractFactory.getTranssactionFactory();
    let outlay = transsactionBuilder.createOutlayBuilder().setName('MainOutlay').setAmount(defaultAmount).setTag(new Tag('General')).setPeriodic(false).setPaid(true).build();
    let deposit = transsactionBuilder.createDepositBuilder().setName('MainDeposit').setAmount(defaultAmount).setTag(new Tag('General')).setPeriodic(false).setPaid(true).build();
    let outlay2 : Outlay;
    
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

    it('Transsactions has a lot of subtranssactions', function() {
        outlay2 = transsactionBuilder.createOutlayBuilder().setName('Switch').setAmount(70).setTag(new Tag('Videoconsole')).setPeriodic(false).setPaid(true).build();
        outlay.addSubTranssaction(outlay2);
        assert.equal(outlay.getSubtranssaction().length, 2);
        assert.equal(outlay.getTotalAmount(), -120);
    })

    it('Subtranssactions has subsubtranssactions', function() {
        outlay2.addSubTranssaction(transsactionBuilder.createOutlayBuilder().setName('SD Card').setAmount(40).setTag(new Tag('Technology')).setPeriodic(false).setPaid(true).build());
        assert.equal(outlay2.getSubtranssaction().length, 1);
        assert.equal(outlay.getTotalAmount(), -120);
        assert.equal(outlay2.getTotalAmount(), -70);
        outlay2.addSubTranssaction(transsactionBuilder.createOutlayBuilder().setName('Console').setAmount(330).setTag(new Tag('VideoGame')).setPeriodic(false).setPaid(true).build());
        assert.equal(outlay.getTotalAmount(), -420);
        assert.equal(outlay2.getTotalAmount(), -370);
    })
});