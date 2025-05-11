import Router from "express";
import controller from "../controllers/PmController.js";
import dotenv from "dotenv";
dotenv.config();
const router = new Router();

router.get("/list", controller.list);
router.get("/run", controller.run);
router.get("/stop", controller.stop);
router.get("/delete", controller.delete);

export default router;
