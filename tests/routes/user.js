import chai, {
    expect
} from 'chai';
import chaiHttp from 'chai-http'

import {
    User
} from "../../models";
import server from "../../index";

let should = chai.should();
chai.use(chaiHttp);


describe('Users', function () {
    this.timeout(10000);

    describe('GET /user', () => {
        it('it should return an array of users', (done) => {
            chai.request(server)
                .get('/user')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });



    describe('POST /user', () => {
        it('should accept new user, hash password, save it and provide feedback', (done) => {
            const user = {
                "login": "sampleText3",
                "password": "12345678",
                "role": []
            };
            chai.request(server)
                .post('/user')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);

                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('login');
                    res.body.should.have.property('password');
                    res.body.should.have.property('role');
                    res.body.should.have.property('isActive');

                    res.body["isActive"].should.equal(true);
                    res.body["login"].should.be.a('string');
                    res.body["password"].should.be.a('string');
                    res.body["role"].should.be.a('array');

                    done();
                });
        });



    });
});