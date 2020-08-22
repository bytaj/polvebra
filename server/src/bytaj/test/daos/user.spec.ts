import assert from 'assert';
import {expect} from 'chai';
import User from '../../main/user/domain/User';
import '../../main/shared/infrastructure/mongodb/database';
import AbstractFactory from '../../main/transaction/domain/AbstractFactory';
import {getPersistenceController} from '../../main/shared/application/PersistenceController';


describe('CRUD User', () => {
    const usernameTest1: string = "test1";
    const usernameTest2: string = "test2";
    const nameTest: string = "testName";
    const emailTest1: string = "test1@test.com";
    const emailTest2: string = "test2@test.com";
    const passwordTest: string = "test";
    const modifiedPasswordTest: string = "newPassword";

    let userCreated1: User = AbstractFactory.getUserFactory()
        .createUserBuilder(usernameTest1, nameTest, emailTest1, passwordTest)
        .build();
    let userCreated12: User = AbstractFactory.getUserFactory()
        .createUserBuilder(usernameTest2, nameTest, emailTest1, passwordTest)
        .build();
    let userCreated13: User = AbstractFactory.getUserFactory()
        .createUserBuilder(usernameTest1, nameTest, emailTest2, passwordTest)
        .build();
    let userCreated2: User = AbstractFactory.getUserFactory()
        .createUserBuilder(usernameTest2, nameTest, emailTest2, passwordTest)
        .build();
    let userSaved1: User;
    let userSaved2: User;
    let idUser1: any;
    let idUser2: any;

    it('User created in DB', async function () {
        try {
            userSaved1 = await getPersistenceController().getUserAdapter().createUser(userCreated1);
            idUser1 = userSaved1.getId();
            assert.ok(userSaved1);
        } catch (err) {
            console.log(err);
            assert.fail();
        }
    });

    it('Cant created users with same username or email', async function () {
        try {
            userSaved1 = await getPersistenceController().getUserAdapter().createUser(userCreated12);
            assert.fail();
        } catch (err) {
            assert.ok(true);
        }
        try {
            userSaved1 = await getPersistenceController().getUserAdapter().createUser(userCreated13);
            assert.fail();
        } catch (err) {
            assert.ok(true);
        }
    });

    it('Find one user', async function () {
        let userFound: User;
        let usersFound: User[];
        try {
            userSaved2 = await getPersistenceController().getUserAdapter().createUser(userCreated2);
            idUser2 = userSaved2.getId();
            usersFound = await getPersistenceController()
                .getUserAdapter()
                .searchUserByParams({username: usernameTest1});

            userFound = usersFound[0];

            expect(userFound.getName()).to.be.equals(nameTest);
            expect(userFound.getUsername()).to.be.equals(usernameTest1);
            expect(userFound.getEmail()).to.be.equals(emailTest1);
            expect(userFound.getPassword()).to.be.equals(passwordTest);

            usersFound = await getPersistenceController()
                .getUserAdapter()
                .searchUserByParams({username: usernameTest2});
            userFound = usersFound[0];

            expect(userFound.getUsername()).to.be.equals(nameTest);
            expect(userFound.getUsername()).to.be.equals(usernameTest2);
            expect(userFound.getEmail()).to.be.equals(emailTest2);
            expect(userFound.getPassword()).to.be.equals(passwordTest);


        } catch (err) {
            console.log(err);
            assert.fail();
        }
    });

    it('Modify an user', async function () {
        let userModified: User;
        try {
            userCreated2.setPassword(modifiedPasswordTest);
            userModified = await getPersistenceController().getUserAdapter().modifyUser(userCreated2);
            expect(userModified.getPassword()).to.be.equals(modifiedPasswordTest);

        } catch (err) {
            console.log(err);
            assert.fail();
        }
    });

    it('Changing username an user', async function () {
        try {
            userSaved2.setUsername('newUsername');
            await getPersistenceController().getUserAdapter().modifyUser(userSaved2);
            assert.fail();

        } catch (err) {
            assert.ok(true);
        }
    });

    after(() => {
        getPersistenceController().getUserAdapter().removeUser(idUser2);
        getPersistenceController().getUserAdapter().removeUser(idUser1);

    })

});
