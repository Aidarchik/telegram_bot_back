import https from "https";
import fs from "fs";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import passportJWT from "./middleware/passportJWT.js";
import passportVkontakte from "./middleware/passportVkontakte.js";
import dotenv from "dotenv";
dotenv.config();

// import bodyParser from 'body-parser';
// import './vkbot/index.js';

import mongoose from "mongoose";
import postsRouter from "./routes/postsRouter.js";
import authRoutes from "./routes/authRouter.js";
import fileUpload from "express-fileupload";
import cookieSession from "cookie-session";

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 443;
const LOCALPORT = process.env.LOCALPORT || 5000;

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_SESSION_KEYS],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passportJWT(passport);
passportVkontakte(passport);

app.use(express.json({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5000/",
    methods: "GET,POST,PUT,DELETE",
    credentials: true, //учетные данные
  })
);
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use("/images", express.static("static"));
app.use(fileUpload({}));
app.use("/", postsRouter);
app.use("/auth", authRoutes);

// const options = {
//     cert: fs.readFileSync('/etc/letsencrypt/live/sushilike159.ru/fullchain.pem'),
//     key: fs.readFileSync('/etc/letsencrypt/live/sushilike159.ru/privkey.pem')
// };

async function startApp() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(DB_URL);
    app.listen(LOCALPORT, () => {
      console.log(`server started on PORT ${LOCALPORT}`);
    });
    // https.createServer(options, app).listen(PORT, () => console.log(`Сервер запустился на порту ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

startApp();
