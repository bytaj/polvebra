const assert = require('assert');
const AbstractFactory = require('../../main/core/factory/AbstractFactory');
const User = require('../../main/core/model/User');
const Account = require('../../main/core/model/Account');
const Itranssaction = require('../../main/core/model/ITranssaction');
const UserFactory = require('../../main/core/factory/UserFactory');
const UserBuilder = require('../../main/core/factory/UserBuilder');
const TranssactionFactory = require('../../main/core/factory/TranssactionFactory');
const TranssactionBuilder = require('../../main/core/factory/TranssactionBuilder');
const AccountFactory = require('../../main/core/factory/AccountFactory');

describe('Factory', function() {
    it('AbstractFactory gets User Factory', function() {
        assert.equal(Object.getPrototypeOf(AbstractFactory.getUserFactory()), Object.getPrototypeOf(UserFactory.getInstance()));
    });

    it('AbstractFactory gets Transsaction Factory', function() {
        assert.equal(Object.getPrototypeOf(AbstractFactory.getTranssactionFactory()), Object.getPrototypeOf(TranssactionFactory.getInstance()));
    });

    it('AbstractFactory gets Account Factory', function() {
        assert.equal(Object.getPrototypeOf(AbstractFactory.getAccountFactory()),Object.getPrototypeOf(AccountFactory.getInstance()));
    });
});

describe('User Factory', function() {
    it('UserFactory creates a UserBuilder', function() {
        assert.equal(Object.getPrototypeOf(AbstractFactory.getUserFactory().createUserBuilder()), Object.getPrototypeOf(new UserBuilder()));
    });

    it('User Builder creates a User', function() {
        assert.equal(Object.getPrototypeOf(AbstractFactory.getUserFactory().createUserBuilder().build()), Object.getPrototypeOf(new User()));
    });

    describe('UserBuilder creates a User with the specifics params', function() {
        const defaultName = 'exampleName';
        const defaultEmail = 'name@example.com';
        const defaultPassword = '1234';

        const userBuilder = AbstractFactory.getUserFactory().createUserBuilder();
        const finalUser = userBuilder.setName(defaultName).setEmail(defaultEmail).setPassword(defaultPassword).build();
        it('Correct name', function() {
            assert.equal(finalUser.name, defaultName);
        });

        it('Correct email', function() {
            assert.equal(finalUser.email, defaultEmail);
        });

        it('Correct password', function() {
            assert.equal(finalUser.password, defaultPassword);
        });
    });
});

describe('Account Factory', function() {
  describe('Account Factory creates a Account with the specific params', function() {
        const defaultName = 'exampleName';
        const finalAcount = AbstractFactory.getAccountFactory().createAccount(defaultName);
        it('Correct type', function() {
            assert.equal(Object.getPrototypeOf(finalAcount), Object.getPrototypeOf(new Account()));
        });
        
        it('Correct name', function() {
            assert.equal(finalAcount.name, defaultName);
        });

    });
});


describe('Transsaction Factory', function() {
    it('TranssactionFactory creates a TranssactionBuilder', function() {
        assert.equal(Object.getPrototypeOf(AbstractFactory.getTranssactionFactory().createOutlayBuilder()), Object.getPrototypeOf(new TranssactionBuilder()));
    });

    describe('TranssactionBuilder creates a Transsaction with the specifics params', function() {
        const defaultName = 'exampleName';
        const defaultAmount = 2;

        const transsactionBuilder = AbstractFactory.getTranssactionFactory().createOutlayBuilder();
        const finalTranssaction = transsactionBuilder.setName(defaultName).setAmount(defaultAmount).build();

        it('Correct name', function() {
            assert.equal(finalTranssaction.name, defaultName);
        });

        it('Correct Amount', function() {
            assert.equal(finalTranssaction.amount, defaultAmount);
        });
    });
});