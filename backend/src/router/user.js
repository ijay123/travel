import express from "express";
import {
  createUserSchema,
  loginUserSchema,

} from "../controllers/user/UserSchema.js";
import { validationMiddleware } from "../middlewares/validation.js";
const router = express.Router();
import {
  createUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user/User.js";
import { verifyUser } from "../middlewares/verifyUser.js";

router
  .route("/")
  .post(validationMiddleware(createUserSchema), createUser)
  .get(verifyUser, getUsers);
router
  .route("/login")
  .post(validationMiddleware(loginUserSchema), loginUser)
  .patch(updateUser)
  .delete(deleteUser);

router
  .route("/:id")

  .patch(updateUser)
  .delete(deleteUser);

// middleware sits between the request and controller

export default router;
