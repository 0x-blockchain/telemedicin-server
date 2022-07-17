const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose');
const testUtils = require('./testTicketutils');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

let mongoServer = null;

describe('ticketdata test suite', () => {

    beforeAll(async () => {
        mongoServer = new MongoMemoryServer();
        return testUtils.beforeAll(mongoServer, 'testdb', mongoose);
    });

    afterAll(async () => {
        return testUtils.afterAll(mongoServer, mongoose);
    });

    beforeEach(async () => {
        return testUtils.beforeEach();
    });

    afterEach(async () => {
        return testUtils.afterEach();
    });

    it('tests a successful query of all available ticketdata', async () => {
        const response = await request
            .get('/ticket');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(7);
    });
});