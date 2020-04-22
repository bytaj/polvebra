const assert = require('assert');
const AbstractFactory = require('../../../main/core/factory/AbstractFactory');
const UserFactory = require('../../../main/core/factory/UserFactory');

describe('AbstractFactory', function() {
    describe('AbstractFactory gets instances', function() {
        it('Should get User Factory', function() {
            assert.equal(AbstractFactory.getUserFactory().prototype, UserFactory.getInstance().prototype);
        });
    });
});