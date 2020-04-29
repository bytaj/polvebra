const assert = require('assert');
const AbstractFactory = require('../../../main/core/factory/AbstractFactory');
const Itranssaction = require('../../../main/core/model/ITranssaction');
const TranssactionFactory = require('../../../main/core/factory/TranssactionFactory');
const TranssactionBuilder = require('../../../main/core/factory/TranssactionBuilder');
const Tag = require('../../../main/core/model/Tag');

describe('Transsactions', function() {
    const defaultAmount = 100;
    let transsactionBuilder = AbstractFactory.getTranssactionFactory();
    let outlay = transsactionBuilder.createOutlayBuilder().setName('MainOutlay').setAmount(100).setTag(new Tag('General')).setPeriodic(false).setPaid(true).build();
    let deposit = transsactionBuilder.createDepositBuilder().setName('MainDeposit').setAmount(100).setTag(new Tag('General')).setPeriodic(false).setPaid(true).build();
    
    it('Outlay has negative amount', function() {
        assert(outlay.getTotalAmount() < 0);
    })

    it('Deposit has positive amount', function() {
        assert(deposit.getTotalAmount() > 0);
    })
});