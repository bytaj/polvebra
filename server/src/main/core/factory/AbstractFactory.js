const UserFactory = require('./UserFactory');
const AccountFactory = require('./AccountFactory');
const TranssactionFactory = require('./TranssactionFactory');

class AbstractFactory{
    static getUserFactory(){
        return UserFactory.getInstance();
    }

    static getTranssactionFactory(){
        return TranssactionFactory.getInstance();
    }

    static getAccountFactory(){
        return AccountFactory.getInstance();
    }
}

module.exports = AbstractFactory;