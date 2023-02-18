import User from "../model/User.js";
import fileService from "../fileService.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

class AuthService {
    async login(email, password) {
        const candidate = await User.findOne({ email })
        if (candidate) {
            //Ползователь существует, проверка пароля
            const comparePassword = bcrypt.compareSync(password, candidate.password)
            if (comparePassword) {
                //Генерация токена, пароли совпали
                const token = jwt.sign(
                    {
                        email: candidate.email,
                        userId: candidate._id,

                    },
                    process.env.JWT, //Секретный ключ
                    { expiresIn: 60 * 60 } //Время жизни токена в секундах
                )
                return { token: `Bearer ${token}` }
            } else {
                //Если пароль не совпадает
                throw new Error("Пароль не совпадает")
            }
        } else {
            throw new Error("Такого пользователя не существует")
        }

    }

    async register(email, password) {
        const candidate = await User.findOne({ email })
        if (candidate) {
            //Ползователь существует, нужно отправить ошибку
            throw new Error("Такой пользователь существует")
        } else {
            const salt = bcrypt.genSaltSync(10)
            console.log(salt);
            const createUser = await User.create({
                email,
                password: bcrypt.hashSync(password, salt)
            })
            return createUser
        }

    }
}

export default new AuthService