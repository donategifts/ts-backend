import {Joi, Segments} from "celebrate";

export const validateAddress = {
  street: Joi.string().required(),
  streetNumber: Joi.string().required(),
  additionalAddress: Joi.string().optional(),
  zipcode: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  state: Joi.string().required(),
};

export const validateCreateAddress = {
  [Segments.BODY]: Joi.object().keys(validateAddress),
};

