import assert from 'assert';
import AbstractFactory from '../../../main/core/factory/AbstractFactory';
import Tag from '../../../main/core/model/Tag';

describe('Accounts', function() {
    const defaultName = 'test Account';
    let accountBuilder = AbstractFactory.getAccountFactory();
    let transactionBuilder = AbstractFactory.getTransactionFactory();
    let account = accountBuilder.createAccount(defaultName);
    const salaryAmount = 500;
    const firstoutlayamount = 50;
    const firstsuboutlayamount = 30;
    const secondsuboutlayamount = 300;
    const netBalance = salaryAmount-firstoutlayamount-firstsuboutlayamount-secondsuboutlayamount;
    const allBalance = salaryAmount-firstoutlayamount-firstsuboutlayamount;
    let firstDeposit = transactionBuilder.createDepositBuilder('MaySalary', salaryAmount).setTag(new Tag('Salary')).setPaid(true).build();
    let firstOutlay = transactionBuilder.createOutlayBuilder('MainOutlay', firstoutlayamount).setTag(new Tag('General')).setPaid(true).build();
    let secondOutlay = transactionBuilder.createOutlayBuilder('SecondOutlay',0).setTag(new Tag('General')).setPaid(true).build();
    secondOutlay.addSubTransaction(transactionBuilder.createOutlayBuilder('SubTracc', firstsuboutlayamount).setTag(new Tag('General')).setPaid(true).build());
    secondOutlay.addSubTransaction(transactionBuilder.createOutlayBuilder('SubTracc2',secondsuboutlayamount).setTag(new Tag('General')).setPaid(false).build());
    account.addTransaction(firstDeposit);
    account.addTransaction(firstOutlay);
    account.addTransaction(secondOutlay);

    it('Account correct name', function() {
        assert.equal(account.getName(), defaultName);
    })

    it('Account Total Balance', function() {
        assert.equal(account.getBalance(), allBalance);
    })

    it('Account Net Balance', function() {
        assert.equal(account.getNetBalance(), netBalance);
    })
});