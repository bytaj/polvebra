import { UserPetition } from './User/UserPetition';

export interface SessionManager{
    refreshToken(refreshToken:string):Promise<string>;
    userFromSession(token:string): Promise<UserPetition>;
}