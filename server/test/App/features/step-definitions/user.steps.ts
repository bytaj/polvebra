import { Given } from 'cucumber';
import container from '../../../../src/apps/backend/config/dependency-injection';
import { UserCreator } from '../../../../src/Contexts/App/User/application/UserCreator';
import User from '../../../../src/Contexts/App/User/domain/User';
import UserRepository from '../../../../src/Contexts/App/User/domain/UserRepository';
import { Uuid } from '../../../../src/Contexts/Shared/domain/value-object/Uuid';

let userRepository: UserRepository = container.get('Polvebra.user.UserRepository');
let userCreator: UserCreator = container.get('Polvebra.user.UserCreator');
let _request;

Given('a user {string} registered in the application', async (username: string) => {
    await createUserInDB();
});

async function createUserInDB(): Promise<User> {
    return userCreator.run({
                               id: Uuid.random().value,
                               username: 'user1',
                               name: 'Test Name',
                               email: 'test@test.com',
                               passwordA: 'testPassword',
                               passwordB: 'testPassword'
                           });
}