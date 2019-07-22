/**
 * A function that, as it's name suggests, ensures uniquity of a given field through the whole collection.
 * @param fieldName - name of the unique field
 * @returns {Function} - function you need to plug in to your schema 'pre' hook
 */
export default fieldName => async function(next, done) {

    //grab the unique field value of the document that is about to be checked
    const uniqueField = this[fieldName];

    await this.constructor.findOne({[fieldName]: uniqueField}, (err, test) => {
        if(err)
            done(err);
        if(test)
            done("Name already taken");
        done();
    });
}