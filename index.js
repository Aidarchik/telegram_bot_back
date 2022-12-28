import https from 'https';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import dotenv from 'dotenv';
dotenv.config();

// import bodyParser from 'body-parser';
// import './vkbot/index.js';

import mongoose from 'mongoose';
import router from './router.js';
import fileUpload from 'express-fileupload';

const DB_URL = "mongodb://root:example@localhost:27017/"
const PORT = process.env.PORT || 443
const LOCALPORT = process.env.LOCALPORT || 5000

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/images', express.static('static'));
app.use(express.static('sertBot'));
app.use(fileUpload({}))
app.use('/api', router)


// const options = {
//     cert: fs.readFileSync('/etc/letsencrypt/live/sushilike159.ru/fullchain.pem'),
//     key: fs.readFileSync('/etc/letsencrypt/live/sushilike159.ru/privkey.pem')
// };


async function startApp() {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(DB_URL)
        app.listen(LOCALPORT, () => { console.log(`server started on PORT ${LOCALPORT}`) })
        // https.createServer(options, app).listen(PORT, () => console.log(`Сервер запустился на порту ${PORT}`));
    } catch (e) {
        console.log(e)
    }
}

startApp();