import { token, vkOptions, vkOptionsElectron, tokenElecton } from './auth_data.js';
import VK from 'node-vk-bot-api';
import https from 'https';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());


const vk = new VK(vkOptionsElectron);

vk.on((ctx) => {
    ctx.reply(JSON.stringify(ctx));
    console.log(ctx);
});

vk.startPolling();


// app.get('/', (req, res) => {
//     vk.request('wall.get', { 'user_id': 1 }, function (_o) {
//         return res.status(200).json(vk);
//     });

//     // return res.status(200).json({}); //
// });

// const options = {
//     cert: fs.readFileSync('./sslcert/fullchain.pem'),
//     key: fs.readFileSync('./sslcert/privkey.pem')
// };
// https.createServer(options, app).listen(443, () => console.log('Сервер запустился на порту 8443'));
