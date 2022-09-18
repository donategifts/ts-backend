import {Joi, Segments} from "celebrate";

export const validateCreateCard = {
  [Segments.BODY]: Joi.object().keys({

  }),
};

export const validateCreateChildCard = {
  [Segments.BODY]: Joi.object().keys({
    type: Joi.string().required().valid("CHILD"),
    images: Joi.array().min(1).items({
      path: Joi.string().required(),
      isMainImage: Joi.boolean().required(),
    }),
    itemUrl: Joi.string().min(5),
    itemPrice: Joi.number().precision(2),
    status: Joi.string().required().valid("DRAFT", "PUBLISHED"),
    addressId: Joi.string().required(),
    birthday: Joi.date().optional().iso(),
    gender: Joi.string().optional().valid("MALE", "FEMALE"),
    firstName: Joi.string().required().min(2),
    lastName: Joi.string().optional().min(2),
    interest: Joi.string().optional(),
    bio: Joi.string().optional(),
  }),
};

