import UserFactory from './userFactory';

class AbstractFactory{
    constructor(){
        
    }

    static getUserFactory(){
        return UserFactory.getInstance();
    }
}