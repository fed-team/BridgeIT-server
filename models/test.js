import { Schema, model } from 'mongoose'

const util = require('util')



const TestSchema = new Schema({
    name: { type: String, required: true, unique: true },
})

TestSchema.pre("save", true, function(next, done) {


    this.constructor.findOne({name: this.name}, (err, test) => {
        if(err) 
            done(err);
        if(test) 
            done("this name has taken");
        done();
    });
    next();
});

export default model('Test', TestSchema)