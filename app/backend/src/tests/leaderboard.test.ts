import * as sinon from 'sinon';
import * as chai from 'chai';
import SequelizeMatchModel from '../database/models/MatchesModel';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { allMatchesMock } from './Mocks/leaderboardMock';

chai.use(chaiHttp);

const { expect } = chai;

chai.use(chaiHttp);

describe('testes da rota leaderboard', () => {
    afterEach(() => sinon.restore());
    it('verifica o retorno dos times que ganharam em casa', async () => {
        const foundMatches = SequelizeMatchModel.bulkBuild(allMatchesMock);
        sinon.stub(SequelizeMatchModel, 'findAll').resolves(foundMatches);

        const response = await chai.request(app)
        .get('/leaderboard/home');

        expect(response.status).to.be.equal(200);
    });
});