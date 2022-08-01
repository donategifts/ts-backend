import * as express from "express";
import {inject} from "inversify";
import {controller, httpGet, httpPost, interfaces, next, request, response} from "inversify-express-utils";
import {TYPES} from "../core/types";
import {UserService} from "../services/users/UserService";
import {User, UserCreateInput} from "../connectors/users/entities/User";
import {validateCreateUser, validateErrors} from "../core/validations/Validator";
import {validateToken} from "../core/validations/FirebaseValidator";

@controller("/users")
export class UserController implements interfaces.Controller {

	constructor( @inject(TYPES.UserServiceType) private userService: UserService ) {
	}

	@httpPost("/", ...validateCreateUser, validateErrors, validateToken)
	private async createUser(@request() req: express.Request & {user: {[key: string]: string}}, @response() _res: express.Response, @next() _next: express.NextFunction): Promise<User> {
		console.log("AHHH", req.user);

		const body: UserCreateInput = req.body;
		body.email = req.user.email;
		body.uid = req.user.uid;

		console.log(body);
		return this.userService.create(body);
	}

	@httpGet("/", validateToken)
	private async getUser(@request() req: express.Request & {user: {[key: string]: string}}, @response() _res: express.Response, @next() _next: express.NextFunction): Promise<User | null> {
		return this.userService.getByEmail(req.user.email);
	}

}
