import { Joi, Segments } from "celebrate";
import { validateAddress } from "./AddressValidator";

export const validateCreateAgency = {
	[Segments.BODY]: Joi.object().keys({
		name: Joi.string().required().min(3),
		bio: Joi.string().optional().trim(),
		phone: Joi.string().min(5),
		website: Joi.string().domain(),
		address: Joi.object().keys(validateAddress),
	}),
};

export const validateVerifyAgency = {
	[Segments.PARAMS]: Joi.object().keys({
		id: Joi.string().required(),
	}),
};
