import {Joi, Segments} from "celebrate";
import {UserRoles} from "../../connectors/users/entities/UserRoles";

export const validateCreateUser = {
  [Segments.BODY]: Joi.object().keys({
    firstName: Joi.string().required().trim(),
    lastName: Joi.string().optional().trim(),
    role: Joi.string().allow(...Object.values(UserRoles).filter((role) => role !== UserRoles.ADMIN)),
  }),
};

export const validateUpdateUser = {
  [Segments.BODY]: Joi.object().keys({
    firstName: Joi.string().optional().trim(),
    lastName: Joi.string().optional().trim(),
  }),
};
