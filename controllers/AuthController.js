import AuthService from "../services/AuthService.js";

class AuthController {
    async login(req, res) {
        try {
            console.log(req.cookie);
            const user = await AuthService.login(req.body.email, req.body.password)
            res.status(200).json({ message: user });
        } catch (e) {
            res.status(500).json(e.message)
        }

    }

    async register(req, res) {
        try {

            const user = await AuthService.register(req.body.email, req.body.password)
            res.status(200).json({ message: user });
        } catch (e) {
            res.status(500).json(e.message)
        }

    }
}

export default new AuthController();