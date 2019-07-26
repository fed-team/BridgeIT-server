const chai = require('chai'),
      chaiHttp = require('chai-http');

const { Role } = require("../models");
const server = require("../index");

let should = chai.should();
chai.use(chaiHttp);


describe('Roles', function() {
    this.timeout(10000);

    beforeEach(async () => {
        await Role.deleteMany({});
    });

    describe('GET /role', () => {
        it('it should return an empty array', (done) => {
            chai.request(server)
                .get('/role')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('POST /role', () => {
        it('should accept new role, save it and provide feedback', (done) => {
            const role = {
                name: "sample text",
                color: "#333"
            };
            chai.request(server)
                .post('/book')
                .send(role)
                .end((err, res) => {
                    res.should.have.status(200);

                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('color');
                    res.body.should.have.property('isActive');

                    res.body["isActive"].should.equal(false);
                    res.body["name"].should.equal(role.name);
                    res.body["color"].should.equal(role.color);

                    done();
                });
        });

    });

});