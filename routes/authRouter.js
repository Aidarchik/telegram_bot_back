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
    res.status(500).json({ message: { ...req } })
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