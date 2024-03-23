import express from "express";
const TravelRouter = express.Router();

import {
  getTravels,
  createTravel,
  updateTravel,
  deleteTravel,
} from "../controllers/travel/Travel.js";
import { createTravelSchema } from "../controllers/travel/TravelSchema.js";
import { validationMiddleware } from "../middlewares/validation.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import { authorizeUser } from "../middlewares/authorizeUser.js";

TravelRouter.route("/")
  .post(
    verifyUser,
    validationMiddleware(createTravelSchema),
    authorizeUser(["admin", "regular"]),
    createTravel
  )
  .get(verifyUser, getTravels);

TravelRouter.route("/:id")
  .patch(verifyUser, authorizeUser(["regular", "admin"]), updateTravel)
  .delete(verifyUser, authorizeUser(["regular", "admin"]), deleteTravel);

export default TravelRouter;
