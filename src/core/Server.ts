import * as bodyParser from "body-parser";
import {InversifyExpressServer} from "inversify-express-utils";
import {container} from "./DefaultContainer";
import * as cors from "cors";
import * as express from "express";
import {HttpValidationError} from "./validations/errors/HttpValidationError";

export const server = new InversifyExpressServer(container);
server.setConfig((app) => {
	app.use(cors());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
});
server.setErrorConfig((app) => {
	app.use(function (err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) {
		if (err instanceof HttpValidationError) {
			return res.status(err.status || 500).json({error: err});
		}
		console.error(err);
		res.status(err.status || 500).json({error: "Internal Server Error"});
	});
});
