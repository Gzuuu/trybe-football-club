import { validUserMock } from './Mocks/userMock';
import UserModel from '../database/models/UserModel';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

chai.use(chaiHttp);


describe('Testes da rota de login', () => {
    afterEach(() => sinon.restore());
    it('deve retornar uma role quando enviar um e-mail válido na rota login/role', async ()=> {
        //Arrange
        const foundHost = UserModel.build({
            id: 1,
            email: 'admin@admin.com',
            password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
            role: 'admin',
            username: 'Admin'
        });
        sinon.stub(UserModel, 'findByPk').resolves(foundHost);
        //Act
        const response = await chai.request(app)
        .get('/login/role')
        .set({ "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg2ODYwMDMzfQ._tBZBKHDp0HtdW-vevUb_sFBpT8Yv6pXPZ1nzh74hCs"});
        //Assert
        expect(response.status).to.be.equal(200);
    });

    it('deve retornar um token quando informado um e-mail e senha válidos', async () => {
        //Arrange
        const foundHost = UserModel.build({
            id: 1,
            email: 'admin@admin.com',
            password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
            role: 'admin',
            username: 'Admin'
        });
        sinon.stub(UserModel, 'findOne').resolves(foundHost)
        //Act
        const response = await chai.request(app)
        .post('/login')
        .send(validUserMock);
        //Assert
        expect(response.status).to.be.equal(200);
        expect(response.body).to.haveOwnProperty('token');
    });
})