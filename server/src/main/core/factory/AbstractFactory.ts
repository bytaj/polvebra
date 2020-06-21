import UserFactory from './UserFactory';
import AccountFactory from './AccountFactory';
import TransactionFactory from './TransactionFactory';

export default class AbstractFactory{
    static getUserFactory():UserFactory{
        return UserFactory.getInstance();
    }

    static getTransactionFactory():TransactionFactory{
        return TransactionFactory.getInstance();
    }

    static getAccountFactory():AccountFactory{
        return AccountFactory.getInstance();
    }
}