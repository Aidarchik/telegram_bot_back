import Router from "express";
import controller from "../controllers/AuthController.js";
const router = new Router()

router.post('/login', controller.login)

//http://localhost:5000/api/auth/register
router.post('/register', controller.register)


export default router;