import { Strategy } from 'passport-vkontakte'
import User from '../model/User.js'

const passportVkontakte = (passport) => {

    const options = {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
    }

    const verify = async (accessToken, refreshToken, params, profile, done) => {
        // const user = await User.findOne({ vkontakteId: profile.id })
        console.log(profile);
        done(null, profile)
        // try {
        //     if (user) {
        //         done(null, user) //Первый параметр это ошибка, второй наши данные
        //     } else {
        //         done(null, false) //Пользователь не найден, поэтому не будем добавлять никаких данных к запросам
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    passport.serializeUser((user, done) => {
        console.log(user);
        done(null, user)
    })

    passport.deserializeUser((user, done) => {
        done(null, user)
    })

    passport.use(new Strategy(options, verify))
}

export default passportVkontakte