import {UserRoles} from "../entities/UserRoles";
import {Joi, Segments} from "celebrate";
import {validateAddress} from "./AddressValidator";

export const validateCreateUser = {
	[Segments.BODY]: Joi.object().keys({
		firstName: Joi.string().required().min(3).trim(),
		lastName: Joi.string().optional().trim(),
		uid: Joi.string().required(),
		role: Joi.string().allow(...Object.values(UserRoles).filter(role => role !== UserRoles.ADMIN)),
		address: Joi.object().keys(validateAddress)
	})
};

export const validateUpdateUser = {
	[Segments.BODY]: Joi.object().keys({
		firstName: Joi.string().optional().min(3).trim(),
		lastName: Joi.string().optional().trim()
	})
};