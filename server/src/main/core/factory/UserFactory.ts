import UserBuilder from './UserBuilder';
import User from '../model/User';
import Tag from '../model/Tag';

export default class UserFactory{
    private static instance?: UserFactory
    
    private constructor(){
        
    }

    public static getInstance(){
        if(!this.instance){
            this.instance = new UserFactory();
        } 
        return this.instance;
    }

    public createUserBuilder(username: string, name:string, email:string, password:string){
        return new UserBuilder(username, name, email, password);
    }
}