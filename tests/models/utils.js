import { expect } from 'chai';

import { Test} from "@models";

describe("Model utility functions", function() {

    beforeEach(async () => {
        await Test.deleteMany({});
    });

    describe("The ensureFieldUniquity function", () => {
        it("Should not allow duplicate field values", done => {
            const firstTest = new Test({ uniqueValuesField: "unique"});
            const secondTest = new Test({ uniqueValuesField: "unique"});

            firstTest.save().then( () => {

                secondTest.save()
                    .then( () => done("Function didn't throw an error"))
                    .catch(error => {
                        expect(error).to.equal("Name already taken");
                        done();
                    })

                });

        })
    })

});