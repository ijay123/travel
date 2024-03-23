import Joi from "joi";

export const createTravelSchema = Joi.object({
  destination: Joi.string()
    .valid(
      "USA",
      "Canada",
      "Australia",
      "China",
      "Nigeria",
      "Ghana",
      "South Africa"
    )
    .required(),
  travelType: Joi.string()
    .valid("Economy", "Business", "First Class")

    .required(),
  departureTime: Joi.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
  departureDate: Joi.date().required(),
  userId: Joi.string().required(),
});
