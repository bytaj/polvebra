import UserBuilder from './UserBuilder';
import User from '../model/User';

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

    public createUserFromJSON(json:any):User{
        let user:User = new User(json.username, json.name, json.email, json.password);
        user.setId(json._id.valueOf());
        return user;
    }
}