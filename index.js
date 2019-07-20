import express from 'express'

import config from './config'
import routeTest from './routes/test'

const app = express()

config.useMiddleware(app)
config.mongo_connect()

app.use('/test', routeTest)

const port = process.env.PORT || 1200
app.listen(port, err => {
    if(err) throw err
    console.log(`> Ready on server http://localhost:${port}`)
})
