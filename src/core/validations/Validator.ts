import {body, header, validationResult} from "express-validator";
import {UserRoleValues} from "../entities/UserRoles";
import {HttpValidationError} from "./errors/HttpValidationError";
import * as express from "express";

export function validateErrors(req: express.Request, _res: express.Response, next: express.NextFunction): void {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		throw new HttpValidationError(errors.array());
	}
	next();
}

export const validateCreateUser = [
		header("authorization").exists(),
		body("firstName").exists().isLength({min: 3}).trim(),
		body("lastName").optional().isLength({min: 3}).trim(),
		body("uid").exists().notEmpty(),
		body("role").exists().custom(value => Object.values(UserRoleValues).filter(role => role != UserRoleValues.ADMIN).includes(value)),
	];

