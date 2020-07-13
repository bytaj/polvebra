import UserFactory from '../../user/domain/UserFactory';
import AccountFactory from '../../account/domain/AccountFactory';
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