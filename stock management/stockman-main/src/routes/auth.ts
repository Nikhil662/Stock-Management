import express from "express";
import authController from "../controllers/authController";

const router = express.Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/logout", authController.logout);
router.post("/requestrefresh", authController.requestRefresh);

export default router;
