import Joi from "joi";

export const createUserSchema = Joi.object({
  firstName: Joi.string().max(20).required(),
  lastName: Joi.string().max(20).required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  role: Joi.string().valid("regular", "admin").optional(),
  avatar: Joi.string().optional(),
  gender: Joi.string().valid("Male", "Female").optional(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const getUsersSchema = Joi.object({
  email: Joi.string().optional(),
  avatar: Joi.string().optional(),
});
