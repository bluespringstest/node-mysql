const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const getDb = require('../src/services/db')

describe('create album', () => {
    let db;
    beforeEach(async () => (db = await getDb()));
    afterEach(async () => {
        await db.query('DELETE FROM Album');
        await db.close();
    })
    describe('/artist', () => {
        describe('POST', () => {
            it('creates a new album in the database', async () => {
                const old = await request(app).post('/artist').send({
                    name: 'Linkin Park',
                    genre: 'rock',
                });
                const first = await request(app).post('/1/album').send({
                    name: 'Meteora',
                    year: '2003',
                });
                expect(first.status).to.eq(201);

                const [[artistEntries]] = await db.query(
                    `SELECT * FROM Album WHERE name = Meteora`
                );
                expect(artistEntries.name).to.equal('Meteora');
                expect(artistEntries.year).to.equal('2013');
            });
        });
    });
});