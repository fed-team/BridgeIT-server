import { Schema, model, models } from 'mongoose'

const TestSchema = new Schema({
    name: { type: String, required: true, unique: true },
})

TestSchema.pre("save", true, function(next, done) {
    models.Test.findOne({name: this.name}, (err, test) => {
        if(err) 
            done(err);
        if(test) 
            done("this name has taken");
        done();
    });
    next();
});

export default model('Test', TestSchema)