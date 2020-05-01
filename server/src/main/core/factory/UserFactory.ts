import UserBuilder from './UserBuilder';

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

    public createUserBuilder(name:string, email:string, password:string){
        return new UserBuilder(name, email, password);
    }
}