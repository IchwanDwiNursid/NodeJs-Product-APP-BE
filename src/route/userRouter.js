import express from "express";
import userController from "../controller/userController.js";
import { adminOnly, verifyUser } from "../middleware/authMiddleware.js";

export const userRouter = express.Router();

userRouter.post("/users", verifyUser, adminOnly, userController.register);
userRouter.get("/users", verifyUser, adminOnly, userController.getUser);
userRouter.get(
  "/users/:userId",
  verifyUser,
  adminOnly,
  userController.getUserById
);
userRouter.patch(
  "/users/:userId",
  verifyUser,
  adminOnly,
  userController.updateUser
);
userRouter.delete(
  "/users/:userId",
  verifyUser,
  adminOnly,
  userController.deleteUser
);
