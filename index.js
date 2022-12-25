import https from 'https';
// import fs from 'fs';
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
const PORT = process.env.PORT || 5000

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/images', express.static('static'));
app.use(fileUpload({}))
app.use('/api', router)

async function startApp() {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => { console.log(`server started on PORT ${PORT}`) })
    } catch (e) {
        console.log(e)
    }
}

startApp();

// const tmp = {
//     key: 'value',
//     key2: 'value2',
//     key3: 'value3',
//     key4: 'value4',
// }

// for (let [key, value] of Object.entries(tmp)) {
//     console.log(key, value);
// }
// const options = {
//     cert: fs.readFileSync('./sslcert/fullchain.pem'),
//     key: fs.readFileSync('./sslcert/privkey.pem')
// };
// https.createServer(options, app).listen(443, () => console.log('Сервер запустился на порту 8443'));
