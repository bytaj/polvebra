import { instance } from 'ts-mockito';
import { when } from 'ts-mockito';
import { mock } from 'ts-mockito';
import { UserId } from '../../../../../src/Contexts/App/Shared/domain/User/UserId';
import { UserFinder } from '../../../../../src/Contexts/App/User/application/UserFinder';
import { UserPetition } from '../../../../../src/Contexts/App/Shared/domain/User/UserPetition';
import { UserType } from '../../../../../src/Contexts/App/Shared/domain/User/UserType';
import User from '../../../../../src/Contexts/App/User/domain/User';
import UserRepository from '../../../../../src/Contexts/App/User/domain/UserRepository';
import { UnauthorizedAccessException } from '../../../../../src/Contexts/Shared/domain/exceptions/UnauthorizedAccessException';
import Logger from '../../../../../src/Contexts/Shared/domain/Logger';

let userFinder: UserFinder;
const userAId: UserId = UserId.random();
const userBId: UserId = UserId.random();
const userCId: UserId = UserId.random();

function createUserA(): User {
    return User.fromPrimitives({
                                   id: userAId.toString(),
                                   username: 'testA',
                                   name: 'Test Name A',
                                   email: 'emailA@test.com',
                                   password: 'passwordA',
                                   balance: 1,
                                   netBalance: 0,
                               });
}

function createUserB(): User {
    return User.fromPrimitives({
                                   id: userAId.toString(),
                                   username: 'testB',
                                   name: 'Test Name B',
                                   email: 'emailB@test.com',
                                   password: 'passwordB',
                                   balance: 1,
                                   netBalance: 0,
                               });
}

function createUserC(): User {
    return User.fromPrimitives({
                                   id: userAId.toString(),
                                   username: 'testC',
                                   name: 'Test Name C',
                                   email: 'emailC@test.com',
                                   password: 'passwordC',
                                   balance: 1,
                                   netBalance: 0,
                               });
}

const userA = createUserA();
const userB = createUserB();
const userC = createUserC();
const allUsers = [userA, userB, userC];

beforeAll(() => {
    let mockUserRepository: UserRepository = mock<UserRepository>();
    when(mockUserRepository.search(userAId)).thenReturn(Promise.resolve(userA));
    when(mockUserRepository.search(userBId)).thenReturn(Promise.resolve(userB));
    when(mockUserRepository.search(userCId)).thenReturn(Promise.resolve(userC));
    when(mockUserRepository.searchAll()).thenReturn(Promise.resolve(allUsers));

    let mockLogger: Logger = mock<Logger>();

    const userRepository: UserRepository = instance(mockUserRepository);
    const logger: Logger = instance(mockLogger);

    userFinder = new UserFinder(userRepository, logger);
});

describe('One user finds users', () => {
    it('User finds his own', async () => {
        await expect(userFinder.run(userAId, new UserPetition(userAId, UserType.USER)))
            .resolves
            .toEqual([userA]);
    });

    it('One user can\'t see other one', async () => {
        await expect(userFinder.run(userBId, new UserPetition(userAId, UserType.USER)))
            .rejects
            .toThrow(UnauthorizedAccessException);
    });

    it('User finds all users', async () => {
        await expect(userFinder.run(null, new UserPetition(userAId, UserType.USER))).resolves.toEqual([userA]);
    });
});

describe('Admin finds users', () => {
    it('Admin finds one user', async () => {
        await expect(userFinder.run(userAId, new UserPetition(userAId, UserType.ADMIN))).resolves.toEqual([userA]);
    });

    it('Admin finds all users', async () => {
        await expect(userFinder.run(null, new UserPetition(userAId, UserType.ADMIN))).resolves.toEqual(allUsers);
    });
});
