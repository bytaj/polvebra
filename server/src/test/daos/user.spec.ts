import assert, { doesNotReject } from 'assert';
import {expect}  from 'chai';
import fetch from 'node-fetch';
import User from '../../main/core/model/User';
import UserMongoAdapter from '../../main/dao/mongodb/adapters/UserMongoAdapter';
import '../../main/dao/mongodb/database';
import UserFactory from '../../main/core/factory/UserFactory';
import AbstractFactory from '../../main/core/factory/AbstractFactory';




describe('CRUD User',  () => {
    const usernameTest1: string = "test1"; 
    const usernameTest2: string = "test2";
    const nameTest: string = "testname"; 
    const emailTest1: string = "test1@test.com";
    const emailTest2: string = "test2@test.com";
    const passwordTest: string = "test";

    let userCreated:User = AbstractFactory.getUserFactory().createUserBuilder(usernameTest1, nameTest, emailTest1, passwordTest).build();
    let userSaved:any;
    let idUser:any;

    it('User created in DB', async function () {
        try{
            userSaved = await UserMongoAdapter.createUser(userCreated);
            idUser = (<any> userSaved)._id;
            userSaved = userSaved;
            assert.ok(userSaved);
        }catch(err){
            console.log(err);
            assert.fail();   
        }
    });

    it('Cant created users with same username or email', async function(){

    });

    it('User deleted', async function() {
        UserMongoAdapter.removeUser(idUser);
    });
});
