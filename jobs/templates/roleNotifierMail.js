export default (roles) => {
    let messageBody = "";
    roles.forEach( (role) => messageBody += `--> role "${role.name}" of color #${role.color} is inactive\n`);
    return `
There are new roles that need to be reviewed and activated!
${messageBody}
`
}