const token = 'vk1.a.pd0FHqHEFC0QWdzrm0o7Lb2mo1BsgpetEwHeP7RGjYoxAULj50EoHT6UMHw5KnhPsPhhDbB7cDq0l4wbs0f62Nr9bqzoj_rd-bFJ3GZ499alI5WHySpcz3W3BrvqmDk0ayZvs--op2GWo8SJnuyZUoeLx20TiAta-v5DaVwQ9Qtow1FA3nOBQpScuZBpIQrJwtB37ppBr0_OXHTSFefzoA';
const VK = require('vksdk');
const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');


const vk = new VK({
    'appId': 51451963,
    'appSecret': 'nTBxSnh3luIpAN6cI369',
    'language': 'ru',
    'version': '5.131',
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(require('helmet')());

vk.on('serverTokenReady', function (_o) {
    // Here will be server access token
    vk.setToken(_o.access_token);
});

vk.setSecureRequests(true);
vk.setToken(token);

app.get('/', (req, res) => {
    vk.request('users.get', { 'user_id': 1 }, function (_o) {
        return res.status(200).json(vk);
    });

    // return res.status(200).json({}); //
});

const options = {
    cert: fs.readFileSync('./sslcert/fullchain.pem'),
    key: fs.readFileSync('./sslcert/privkey.pem')
};
https.createServer(options, app).listen(443, () => console.log('Сервер запустился на порту 8443'));
