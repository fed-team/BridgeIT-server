const chai = require('chai'),
      chaiHttp = require('chai-http');

const { Role } = require("../models");
const app = require("../index");

let should = chai.should();
chai.use(chaiHttp);


describe('Roles', function() {
    this.timeout(10000);

    beforeEach(async () => {
        await Role.deleteMany({});
    });
    describe('GET /role', () => {
        it('it should return an empty array', (done) => {
            chai.request(app)
                .get('/role')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
});