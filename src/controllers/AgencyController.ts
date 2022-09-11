import * as express from "express";
import {inject} from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
  next,
  request,
  requestParam,
  response,
} from "inversify-express-utils";
import {celebrate} from "celebrate";
import {TYPES} from "../core/types";
import {AgencyService} from "../services/AgencyService";
import {Agency, AgencyCreateRequest} from "../connectors/agencies/entities/Agency";
import {validateAuthHeader, validateToken} from "../core/validations/AuthenticationValidator";
import {validateCreateAgency, validateVerifyAgency} from "../core/validations/AgencyValidator";

@controller("/agency")
export class AgencyController implements interfaces.Controller {

  constructor(@inject(TYPES.AgencyServiceType) private agencyService: AgencyService) {}

  @httpPost("/", celebrate({...validateAuthHeader, ...validateCreateAgency}), validateToken)
  private async createAgency(
    @request() req: express.Request & { user: { [key: string]: string } },
    @response() _res: express.Response,
    @next() _next: express.NextFunction,
  ): Promise<Agency> {
    console.log("AHHH", req.user);
    const {name, bio, phone, website, address} = req.body;

    const agencyCreateRequest: AgencyCreateRequest = {
      name,
      bio,
      phone,
      website,
      createdBy: req.user.uid,
      address,
    };

    return this.agencyService.create(agencyCreateRequest);
  }

  @httpGet("/:id/verify", celebrate(validateVerifyAgency))
  private async verifyAgency(
    @requestParam("id") id: string,
    @request() _req: express.Request & { user: { [key: string]: string } },
    @response() _res: express.Response,
    @next() _next: express.NextFunction,
  ): Promise<Agency> {
    console.log(id);
    return this.agencyService.verify(id);
  }

  @httpGet("/", celebrate(validateAuthHeader), validateToken)
  private async getUser(
    @request() req: express.Request & { user: { [key: string]: string } },
    @response() _res: express.Response,
    @next() _next: express.NextFunction,
  ): Promise<Agency | null> {
    return this.agencyService.getByCreatorId(req.user.uid);
  }

}
