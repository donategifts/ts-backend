import {Joi, Segments} from "celebrate";

export const validateAuthHeader = {
	[Segments.HEADERS]: Joi.object().keys({
	authorization: Joi.string().required(),
}).options({allowUnknown: true})};
