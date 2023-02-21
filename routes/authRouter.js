import Router from "express";
import controller from "../controllers/AuthController.js";
import passport from "passport";
import dotenv from 'dotenv';
dotenv.config();
const router = new Router()

router.post('/login', controller.login)

//http://localhost:5000/api/auth/register
router.post('/register', controller.register)

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'successfull',
            user: req.user,

        })
    }
    // res.redirect('https://sushilike159.ru/api/auth/login/failed')
    res.status(500).json(req.headers)
})

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'failure'
    })
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect(process.env.CLIENT_URL)
})

router.get('/vk', passport.authenticate('vkontakte', {
    scope: ['groups', 'friends', 'photos',]
}))

router.get('/vkontakte/callback',
    passport.authenticate("vkontakte", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/login/failed',
    })
)


export default router;

TypeError: Преобразование круговой структуры в JSON
--> начиная с объекта с конструктором 'Socket'
    | свойство 'parser' -> объект с конструктором 'HTPParser'
--- свойство 'socket' замыкает круг
    в JSON.stringify(<анонимно>)
    в stringify (/root/telegram_bot_back/node_modules/express/lib/response.js:1150:12)
    в ServerResponse.json (/root/telegram_bot_back/node_modules/express/lib/response.js:271:14)
    в файле:///root/telegram_bot_back/routes/authRouter.js:23:21
    в Layer.handle [как handle_request] (/root/telegram_bot_back/node_modules/express/lib/router/layer.js:95:5)
    далее (/root/telegram_bot_back/node_modules/express/lib/router/route.js:144:13)
    на Route.dispatch (/root/telegram_bot_back/node_modules/express/lib/router/route.js:114:3)
    в Layer.handle [как handle_request] (/root/telegram_bot_back/node_modules/express/lib/router/layer.js:95:5)
    в /root/telegram_bot_back/node_modules/express/lib/router/index.js:284:15
    в Function.process_params (/root/telegram_bot_back/node_modules/express/lib/router/index.js:346:12)