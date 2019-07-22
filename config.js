import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'

const setHeaders = res => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
}

const mongo_connect = () => {
    mongoose.set('useCreateIndex', true);
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
}

const useMiddleware = app => {
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(bodyParser.json())
}

export default { setHeaders, mongo_connect, useMiddleware }