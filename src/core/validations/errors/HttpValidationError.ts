import {ValidationError} from "express-validator";

export class HttpValidationError extends Error {

	public status: number;
	constructor(errors: ValidationError[]) {
		super();
		console.log(errors);
		const errorFields = new Set();
		errors.forEach(error => errorFields.add(error.param));
		this.message = "Validation error on fields " + Array.from(errorFields).join(", ");
		this.status = 422;
	}

}
