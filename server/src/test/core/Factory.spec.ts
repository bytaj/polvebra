import assert from 'assert';
import AbstractFactory from '../../main/core/factory/AbstractFactory';
import User from '../../main/core/model/User';
import Account from '../../main/core/model/Account';
//import Itranssaction from '../../main/core/model/ITranssaction';
import UserFactory from '../../main/core/factory/UserFactory';
import UserBuilder from '../../main/core/factory/UserBuilder';
import TranssactionFactory from '../../main/core/factory/TranssactionFactory';
import TranssactionBuilder from '../../main/core/factory/TranssactionBuilder';
import AccountFactory from '../../main/core/factory/AccountFactory';
import * as Constants from '../../main/helpers/Constants'

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
    const defaultName = 'exampleName';
    const defaultEmail = 'name@example.com';
    const defaultPassword = '1234';
    it('UserFactory creates a UserBuilder', function() {
        assert.equal(Object.getPrototypeOf(AbstractFactory.getUserFactory().createUserBuilder(defaultName, defaultEmail, defaultPassword)), Object.getPrototypeOf(new UserBuilder(defaultName, defaultEmail, defaultPassword)));
    });

    it('User Builder creates a User', function() {
        assert.equal(Object.getPrototypeOf(AbstractFactory.getUserFactory().createUserBuilder(defaultName, defaultEmail, defaultPassword).build()), Object.getPrototypeOf(new User(defaultName, defaultEmail, defaultPassword)));
    });

    describe('UserBuilder creates a User with the specifics params', function() {
        const defaultName = 'exampleName';
        const defaultEmail = 'name@example.com';
        const defaultPassword = '1234';

        const userBuilder = AbstractFactory.getUserFactory().createUserBuilder(defaultName, defaultEmail, defaultPassword);
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


describe('Transsaction Factory', function() {
    it('TranssactionFactory creates a TranssactionBuilder', function() {
        assert.equal(Object.getPrototypeOf(AbstractFactory.getTranssactionFactory().createOutlayBuilder()), Object.getPrototypeOf(new TranssactionBuilder(Constants.OUTLAY_STRING)));
    });

    describe('TranssactionBuilder creates a Transsaction with the specifics params', function() {
        const defaultName = 'exampleName';
        const defaultAmount = 2;

        const transsactionBuilder = AbstractFactory.getTranssactionFactory().createOutlayBuilder();
        const finalTranssaction = transsactionBuilder.setName(defaultName).setAmount(defaultAmount).build();

        it('Correct name', function() {
            assert.equal(finalTranssaction.getName(), defaultName);
        });

        it('Correct Amount', function() {
            assert.equal(finalTranssaction.getAmount(), defaultAmount);
        });
    });
});