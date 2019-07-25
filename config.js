import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import schedule from "node-schedule"
import nodemailer from "nodemailer"

let transporter; //nodemailer

import { roleNotifier } from "./jobs";

const setHeaders = res => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
};

const mongo_connect = () => {
    mongoose.set('useCreateIndex', true);
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
};

const useMiddleware = app => {
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(bodyParser.json());
};

const initNodeMailer = () => {

    const { MAIL_SERVICE, MAIL_EMAIL, MAIL_PASSWORD, MAIL_HOST } = process.env;


    if(!((MAIL_EMAIL && MAIL_PASSWORD) && (MAIL_HOST || MAIL_SERVICE)))
        return false;

    transporter = nodemailer.createTransport({
        [MAIL_HOST ? "host" : "service"]: MAIL_HOST || MAIL_SERVICE,
        auth: {
            user: MAIL_EMAIL,
            pass: MAIL_PASSWORD
        }
    })
};

const kickstartScheduler = () => {
    const rolesNotifierJob = schedule.scheduleJob('0 * * * *', () => roleNotifier(transporter));
};

export default { setHeaders, mongo_connect, useMiddleware, kickstartScheduler, initNodeMailer }