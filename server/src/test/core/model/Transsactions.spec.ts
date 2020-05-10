import assert from 'assert';
import AbstractFactory from '../../../main/core/factory/AbstractFactory';
import Outlay from '../../../main/core/model/Outlay';
import Tag from '../../../main/core/model/Tag';

describe('Transactions', function() {
    const defaultAmount = 100;
    let transactionBuilder = AbstractFactory.getTransactionFactory();
    let outlay = transactionBuilder.createOutlayBuilder('MainOutlay', defaultAmount).setTag(new Tag('General')).setPaid(true).build();
    let deposit = transactionBuilder.createDepositBuilder('MainDeposit', defaultAmount).setTag(new Tag('General')).setPaid(true).build();
    let outlay2 : Outlay;
    
    it('Outlay has negative amount', function() {
        assert(outlay.getTotalAmount() < 0);
    })

    it('Deposit has positive amount', function() {
        assert(deposit.getTotalAmount() > 0);
    })

    it('Transactions has subtransactions', function() {
        outlay.addSubTransaction(transactionBuilder.createOutlayBuilder('SubOutlay1', 50).setTag(new Tag('Videogames')).setPaid(true).build());
        assert.equal(outlay.getSubtransaction().length, 1);
        assert.equal(outlay.getTotalAmount(), -100);
    })

    it('Transactions has a lot of subtransactions', function() {
        outlay2 = transactionBuilder.createOutlayBuilder('Switch', 70).setTag(new Tag('Videoconsole')).setPaid(true).build();
        outlay.addSubTransaction(outlay2);
        assert.equal(outlay.getSubtransaction().length, 2);
        assert.equal(outlay.getTotalAmount(), -120);
    })

    it('Subtransactions has subsubtransactions', function() {
        outlay2.addSubTransaction(transactionBuilder.createOutlayBuilder('SD Card', 40).setTag(new Tag('Technology')).setPaid(true).build());
        assert.equal(outlay2.getSubtransaction().length, 1);
        assert.equal(outlay.getTotalAmount(), -120);
        assert.equal(outlay2.getTotalAmount(), -70);
        outlay2.addSubTransaction(transactionBuilder.createOutlayBuilder('Console', 330).setTag(new Tag('VideoGame')).setPaid(true).build());
        assert.equal(outlay.getTotalAmount(), -420);
        assert.equal(outlay2.getTotalAmount(), -370);
    })
});