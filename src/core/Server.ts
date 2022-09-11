import * as bodyParser from "body-parser";
import {InversifyExpressServer} from "inversify-express-utils";
import {container} from "./DefaultContainer";
import * as cors from "cors";
import * as express from "express";
import {errors} from "celebrate";
import {EntryAlreadyExistsError} from "./errors/EntryAlreadyExistsError";
import {EntryNotFoundError} from "./errors/EntryNotFoundError";

export const server = new InversifyExpressServer(container);

server.setConfig((app) => {
	if (process.env.NODE_ENV === "development") {
		app.use(cors());
		//test
	}
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
});

server.setErrorConfig((app) => {
	app.use(errors());
	app.use(function (error: any, _req: express.Request, res: express.Response, _next: express.NextFunction) {
		console.error(error);
		if (error instanceof EntryAlreadyExistsError || EntryNotFoundError) {
			res.status(error.status).json({error: error.message});
			return;
		}
		res.status(error.status || 500).json({error: "Internal Server Error"});
	});
});
