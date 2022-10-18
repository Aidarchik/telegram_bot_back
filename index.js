const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const token = 'vk1.a.ass3jecWjTDGqtscXxWgK_vnRtlmpYVvVGQmr6idtZrvfHxPEURRQcH04n49pINNpEOK7464WygZZU0gtyeUq_IGIx8PvTeyDjHKazjf_qdncSh96mUQV44WoFvzEqAsmmnOOTojcIlQdfE03rbia0sv0iMycGpCVjiB33M8sahIePqQX4O8GRY4uBA_AY06ldjb1cKfndyEx9P9LEXJpQ';

const app = express();

app.use(express.json());
app.use(cors());
app.use(require('helmet')());

app.get('/', (req, res) => {
    return res.status(200).json({}); //
});

const options = {
    cert: fs.readFileSync('./sslcert/fullchain.pem'),
    key: fs.readFileSync('./sslcert/privkey.pem')
};
https.createServer(options, app).listen(443, () => console.log('Сервер запустился на порту 8443'));

console.log('Hello world');