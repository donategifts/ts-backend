import * as express from "express";
import {inject} from "inversify";
import {controller, httpGet, httpPost, httpPut, interfaces, next, request, response} from "inversify-express-utils";
import {TYPES} from "../core/types";
import {UserService} from "../services/users/UserService";
import {User, UserCreateInput, UserUpdateInput} from "../connectors/users/entities/User";
import {validateToken} from "../core/validations/FirebaseValidator";
import {validateCreateUser, validateUpdateUser} from "../core/validations/UserValidator";
import {celebrate} from "celebrate";
import {validateAuthHeader} from "../core/validations/AuthenticationValidator";

@controller("/users")
export class UserController implements interfaces.Controller {

	constructor( @inject(TYPES.UserServiceType) private userService: UserService ) {
	}

	@httpPost("/", celebrate({...validateAuthHeader, ...validateCreateUser}), validateToken)
	private async createUser(@request() req: express.Request & {user: {[key: string]: string}}, @response() _res: express.Response, @next() _next: express.NextFunction): Promise<User> {
		console.log("AHHH", req.user);

		const body: UserCreateInput = req.body;
		body.email = req.user.email;
		body.uid = req.user.uid;

		console.log(body);
		return this.userService.create(body);
	}

	@httpPut("/", celebrate({...validateAuthHeader, ...validateUpdateUser}), validateToken)
	private async updateUser(@request() req: express.Request & {user: {[key: string]: string}}, @response() _res: express.Response, @next() _next: express.NextFunction): Promise<User> {
		console.log("AHHH", req.user);

		const body: UserUpdateInput = req.body;
		body.email = req.user.email;
		console.log(body);
		return this.userService.update(body);
	}

	@httpGet("/", celebrate(validateAuthHeader), validateToken)
	private async getUser(@request() req: express.Request & {user: {[key: string]: string}}, @response() _res: express.Response, @next() _next: express.NextFunction): Promise<User | null> {
		return this.userService.getByEmail(req.user.email);
	}

}
