import * as firebaseAdmin from "firebase-admin";
import * as express from "express";
import {Joi, Segments} from "celebrate";

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.applicationDefault()
});

export async function validateToken(req: express.Request & {user?: {[key: string]: string}}, _res: express.Response, next: express.NextFunction): Promise<void> {
	try {
		req.user = await firebaseAdmin.auth().verifyIdToken(req.header("authorization")?.split(" ")[1] as string);
	} catch (error) {
		throw new Error("Failed to validate token");
	}
	next();
}

export const validateAuthHeader = {
	[Segments.HEADERS]: Joi.object().keys({
		authorization: Joi.string().required(),
	}).options({allowUnknown: true})};

