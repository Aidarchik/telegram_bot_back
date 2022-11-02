import https from 'https';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import './vkbot/index.js';


const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

console.log(process.env.PORT)

app.get('/', (req, res) => {
    return res.status(200).json(vk);
});

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
