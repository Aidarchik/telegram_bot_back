import { Strategy } from 'passport-vkontakte'
import User from '../model/User.js'

export default function (passport) {

    const options = {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
    }

    passport.use(
        new Strategy(options, async (accessToken, refreshToken, params, profile, done) => {
            const user = await User.findOrCreate({ vkontakteId: profile.id })
            console.log(user);
            try {
                if (user) {
                    done(null, user) //Первый параметр это ошибка, второй наши данные
                } else {
                    done(null, false) //Пользователь не найден, поэтому не будем добавлять никаких данных к запросам
                }
            } catch (error) {
                console.log(error);
            }
        })
    )
}