import authController from "../controller/authController.js";
import express from "express";

export const authRouter = express.Router();

authRouter.get("/login", authController.login);
authRouter.get("/userNow", authController.userLogin);
authRouter.delete("/logout", authController.logout);
