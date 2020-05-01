import UserFactory from './UserFactory';
import AccountFactory from './AccountFactory';
import TranssactionFactory from './TranssactionFactory';

export default class AbstractFactory{
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