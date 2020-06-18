import assert from 'assert';
import AbstractFactory from '../../main/core/factory/AbstractFactory';
import User from '../../main/core/model/User';
import Account from '../../main/core/model/Account';
//import AbstractTransaction from '../../main/core/model/AbstractTransaction';
import UserFactory from '../../main/core/factory/UserFactory';
import UserBuilder from '../../main/core/factory/UserBuilder';
import TransactionFactory from '../../main/core/factory/TransactionFactory';
import TransactionBuilder from '../../main/core/factory/TransactionBuilder';
import AccountFactory from '../../main/core/factory/AccountFactory';
import * as Constants from '../../main/helpers/Constants'

describe('Factory', function() {
    it('AbstractFactory gets User Factory', function() {
        assert.equal(Object.getPrototypeOf(AbstractFactory.getUserFactory()), Object.getPrototypeOf(UserFactory.getInstance()));
    });

    it('AbstractFactory gets Transaction Factory', function() {
        assert.equal(Object.getPrototypeOf(AbstractFactory.getTransactionFactory()), Object.getPrototypeOf(TransactionFactory.getInstance()));
    });

    it('AbstractFactory gets Account Factory', function() {
        assert.equal(Object.getPrototypeOf(AbstractFactory.getAccountFactory()),Object.getPrototypeOf(AccountFactory.getInstance()));
    });
});

describe('User Factory', function() {
    const defaultUsername = 'bytaj';
    const defaultName = 'exampleName';
    const defaultEmail = 'name@example.com';
    const defaultPassword = '1234';
    it('UserFactory creates a UserBuilder', function() {
        assert.equal(Object.getPrototypeOf(AbstractFactory.getUserFactory().createUserBuilder(defaultUsername, defaultName, defaultEmail, defaultPassword)), Object.getPrototypeOf(new UserBuilder(defaultUsername, defaultName, defaultEmail, defaultPassword)));
    });

    it('User Builder creates a User', function() {
        assert.equal(Object.getPrototypeOf(AbstractFactory.getUserFactory().createUserBuilder(defaultUsername, defaultName, defaultEmail, defaultPassword).build()), Object.getPrototypeOf(new User(defaultUsername, defaultName, defaultEmail, defaultPassword)));
    });

    describe('UserBuilder creates a User with the specifics params', function() {
        const defaultUsername = 'bytaj';
        const defaultName = 'exampleName';
        const defaultEmail = 'name@example.com';
        const defaultPassword = '1234';

        const userBuilder = AbstractFactory.getUserFactory().createUserBuilder(defaultUsername,defaultName, defaultEmail, defaultPassword);
        const finalUser = userBuilder.build();
        it('Correct name', function() {
            assert.equal(finalUser.getName(), defaultName);
        });

        it('Correct email', function() {
            assert.equal(finalUser.getEmail(), defaultEmail);
        });

        it('Correct password', function() {
            assert.equal(finalUser.getPassword(), defaultPassword);
        });
    });
});

describe('Account Factory', function() {
  describe('Account Factory creates a Account with the specific params', function() {
        const defaultName = 'exampleName';
        const finalAcount = AbstractFactory.getAccountFactory().createAccount(defaultName);
        it('Correct type', function() {
            assert.equal(Object.getPrototypeOf(finalAcount), Object.getPrototypeOf(new Account("")));
        });
        
        it('Correct name', function() {
            assert.equal(finalAcount.getName(), defaultName);
        });

    });
});


describe('Transaction Factory', function() {
    it('TransactionFactory creates a TransactionBuilder', function() {
        assert.equal(Object.getPrototypeOf(AbstractFactory.getTransactionFactory().createOutlayBuilder("", -1)), Object.getPrototypeOf(new TransactionBuilder(Constants.OUTLAY_STRING, "", -1)));
    });

    describe('TransactionBuilder creates a Transaction with the specifics params', function() {
        const defaultName = 'exampleName';
        const defaultAmount = 2;

        const transactionBuilder = AbstractFactory.getTransactionFactory().createOutlayBuilder(defaultName, defaultAmount);
        const finalTransaction = transactionBuilder.build();

        it('Correct name', function() {
            assert.equal(finalTransaction.getName(), defaultName);
        });

        it('Correct Amount', function() {
            assert.equal(finalTransaction.getAmount(), defaultAmount);
        });
    });
});