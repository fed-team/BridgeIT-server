import express from 'express'

import config from '@config'
import { role, test, user } from '@routes'

require('dotenv').config()

const app = express()

config.useMiddleware(app)
config.mongo_connect()
config.initNodeMailer();
config.kickstartScheduler();

app.use('/test', test);
app.use('/role', role);
app.use('/user', user);

const port = process.env.PORT || 1200
const server = app.listen(port, function(err)  {
    if(err) throw err;
    console.log(`> Ready on server http://localhost:${port}`);

});
export default server;

