import UserFactory from './UserFactory';
import AccountFactory from './AccountFactory';
import TransactionFactory from './TransactionFactory';

export default class AbstractFactory{
    static getUserFactory(){
        return UserFactory.getInstance();
    }

    static getTransactionFactory(){
        return TransactionFactory.getInstance();
    }

    static getAccountFactory(){
        return AccountFactory.getInstance();
    }
}