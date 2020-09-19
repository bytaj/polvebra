import assert from 'assert';
import { AfterAll, When, Given, Then } from 'cucumber';
import request from 'supertest';
import app from '../../../../src/apps/backend/app';
import container from '../../../../src/apps/backend/config/dependency-injection';
import { EnvironmentArranger } from '../../../Context/Shared/infrastructure/arranger/EnvironmentArranger';

let _request: request.Test;
let _response: request.Response;
let _accessToken: string;
let _refreshToken: string;

Given('I send a GET request to {string}', (route: string) => {
    _request = request(app).get(route);
    if (_accessToken){
        _request = request(app).get(route).set({'Bearer': _accessToken});
    }else{
        _request = request(app).get(route)
    }
});

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
    _request = request(app).put(route).send(JSON.parse(body));
});

Given('I send a POST request to {string} with body:', (route: string, body: string) => {
    _request = request(app).post(route).send(JSON.parse(body));
});

Then('the response status code should be {int}', async (status: number) => {
    _response = await _request.expect(status);
});

Then('the response should be empty', () => {
    assert.deepStrictEqual(_response.body, {});
});

When('I log the user with username {string} and password {string}', async (username: string, password: string) => {
    _request = request(app).post('/login').send({username: username, password: password});
    _response = await _request.expect(200);
    _accessToken = _response.body.accessToken;
    _refreshToken = _response.body.refreshToken;
});

Then('the response content should be:', response => {
    const responseParsed = JSON.parse(response);
    assert.strictEqual(_response.body.username, responseParsed.username);
    assert.strictEqual(_response.body.name, responseParsed.name);
    assert.strictEqual(_response.body.email, responseParsed.email);
    assert.strictEqual(_response.body.balance, 0);
    assert.strictEqual(_response.body.netBalance, 0);
});


AfterAll(async () => {
    const environmentArranger: EnvironmentArranger = container.get('App.EnvironmentArranger');
    await (await environmentArranger).arrange();
    await (await environmentArranger).close();
});