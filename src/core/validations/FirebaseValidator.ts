import * as firebaseAdmin from "firebase-admin";
import * as express from "express";

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
