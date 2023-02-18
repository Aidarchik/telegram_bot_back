import { Strategy, ExtractJwt } from 'passport-jwt'
import User from '../model/User.js'

export default function (passport) {

    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT
    }

    passport.use(
        new Strategy(options, async (payload, done) => {
            const user = await User.findById(payload.userId).select('email id')
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