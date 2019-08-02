import chai, {expect} from 'chai';
import chaiHttp  from 'chai-http'

import { Role } from "@models";
import server from "@";

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
                color: "#fff"
            };
            chai.request(server)
                .post('/role')
                .send(role)
                .end((err, res) => {
                    res.should.have.status(201);

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

        describe('PATCH /role', () => {
            it('should accept role patch, and provide feedback with success property of true', (done) => {
                const role = new Role({
                    name: "sample text",
                    color: "#333"
                });

                role.save()
                    .then( savedRole => {

                        const rolePatch = {
                            name: "sample text 2",
                            color: "#666"
                        };

                        chai.request(server)
                            .patch(`/role/${savedRole._id}`)
                            .send(rolePatch)
                            .end(async (err, res) => {
                                res.should.have.status(200);

                                res.body.should.be.a('object');
                                res.body.should.have.property('success');
                                res.body["success"].should.equal(true);

                                const retrievedUpdatedRole = await Role.findById(savedRole._id);

                                expect(rolePatch["name"]).to.equal(retrievedUpdatedRole["name"]);
                                expect(rolePatch["color"]).to.equal(retrievedUpdatedRole["color"]);

                                done();
                            });

                    })
            });

        });

    });
});
