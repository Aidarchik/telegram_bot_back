import https from 'https';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import passportJWT from './middleware/passportJWT.js';
import passportVkontakte from './middleware/passportVkontakte.js';
import dotenv from 'dotenv';
dotenv.config();

// import bodyParser from 'body-parser';
// import './vkbot/index.js';

import mongoose from 'mongoose';
import postsRouter from './routes/postsRouter.js';
import authRoutes from './routes/authRouter.js';
import fileUpload from 'express-fileupload';

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT || 443
const LOCALPORT = process.env.LOCALPORT || 5000

const app = express();

app.use(passport.initialize())
passportJWT(passport)
passportVkontakte(passport)

app.use(express.json({ extended: true }));
app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use('/images', express.static('static'));
app.use('/', express.static('./../sushilike159/build/'))
app.use(express.static('sertBot'));
app.use(fileUpload({}))
app.use('/api', postsRouter)
app.use('/api/auth', authRoutes)
app.get('/api/auth/vkontakte/callback', (req, res) => {
    res.status(200).json({ message: "хохохо" });
})


const options = {
    cert: fs.readFileSync('/etc/letsencrypt/live/sushilike159.ru/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/sushilike159.ru/privkey.pem')
};


async function startApp() {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(DB_URL)
        // app.listen(LOCALPORT, () => { console.log(`server started on PORT ${LOCALPORT}`) })
        https.createServer(options, app).listen(PORT, () => console.log(`Сервер запустился на порту ${PORT}`));
    } catch (e) {
        console.log(e)
    }
}

startApp();