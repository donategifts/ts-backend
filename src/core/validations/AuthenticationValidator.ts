import * as firebaseAdmin from "firebase-admin";
import * as express from "express";
import {Joi, Segments} from "celebrate";
import {AuthenticationError} from "../errors/AuthenticationError";

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(),
});

export async function validateToken(
  req: express.Request & { user?: { [key: string]: string } },
  _res: express.Response,
  next: express.NextFunction,
): Promise<void> {
  try {
    req.user = await firebaseAdmin.auth().verifyIdToken(req.header("authorization")?.split(" ")[1] as string);
  } catch (error) {
    console.log(error);
    console.log(req.header("authorization"));
    next(new AuthenticationError());
  }
  next();
}

export const validateAuthHeader = {
  [Segments.HEADERS]: Joi.object()
    .keys({
      authorization: Joi.string().required(),
    })
    .options({allowUnknown: true}),
};
