import express from 'express'

import config from './config'
import { role, test } from './routes'

require('dotenv').config()

const app = express()

config.useMiddleware(app)
config.mongo_connect()

app.use('/test', test);
app.use('/role', role);

const port = process.env.PORT || 1200
app.listen(port, err => {
    if(err) throw err
    console.log(`> Ready on server http://localhost:${port}`)
})
