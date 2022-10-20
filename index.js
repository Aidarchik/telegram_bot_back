import { token, vkOptions, vkOptionsElectron, tokenElecton } from './auth_data.js';
import VK from 'node-vk-bot-api';
import VkBotMarkup from 'node-vk-bot-api/lib/markup.js';
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
const markup = new VkBotMarkup();

vk.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        console.error(e);
    }
});

vk.on((ctx) => {
    const message = ctx.message?.text;
    ctx.reply(message, null, markup
        .keyboard([
            '1', '2', '3',
            '4', '5', '6',
            '7', '8', '9',
            '0',
        ], { columns: 3 })
        .oneTime(),
    );
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
