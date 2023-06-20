import * as sinon from 'sinon';
import * as chai from 'chai';
import SequelizeTeamModel from '../database/models/TeamModel';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { sequelizeSingleTeam, sequelizeTeamMock, singleTeamMock, teamsMock } from './Mocks/teamMock';

chai.use(chaiHttp);

const { expect } = chai;

chai.use(chaiHttp);


describe('Testes da rota de teams', () => {
    beforeEach(() => sinon.restore());
    it('verifica o retorno da lista de times', async () => {
        //Arrange
        const foundTeams = SequelizeTeamModel.bulkBuild(sequelizeTeamMock);
        sinon.stub(SequelizeTeamModel, 'findAll').resolves(foundTeams);
        //Act
        const response = await chai.request(app)
        .get('/teams')
        //Assert
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(teamsMock);
    });

    it('verifica o retorno de um unico time', async () => {
         //Arrange
         const foundTeam = SequelizeTeamModel.build(sequelizeSingleTeam);
         sinon.stub(SequelizeTeamModel, 'findOne').resolves(foundTeam);
         //Act
         const response = await chai.request(app)
         .get('/teams/2')
         //Assert
         expect(response.status).to.be.equal(200);
         expect(response.body).to.be.deep.equal(singleTeamMock);
    });
});