import {controller, httpGet, interfaces, next, request, response} from "inversify-express-utils";
import * as express from "express";

@controller("/")
export class IndexController implements interfaces.Controller {

	@httpGet("/health")
  private async getHealth(
		@request() _req: express.Request,
		@response() _res: express.Response,
		@next() _next: express.NextFunction,
  ): Promise<string> {
    return "I'M ALIVE; KNEEL DOWN, IT IS I YOUR LORD AND SAVIOR";
  }

}
